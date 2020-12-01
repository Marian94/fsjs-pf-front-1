
resource "aws_launch_template" "fred_launch_template" {
    name          = "fred_launch_template"
    image_id      = "${var.ami_id}"
    instance_type = "${var.instance_type}"
    user_data = filebase64("${path.module}/user_data.sh")
    # security group 
    vpc_security_group_ids = ["${var.fred_sg_id}"]
    iam_instance_profile {
        name = "${var.instance_profile_name}"
    }
}

resource "aws_autoscaling_group" "fred_asg" {
  # availability_zones = "${var.az}"
  # availability_zones = ["us-west-1a", "us-west-1b"]
  desired_capacity   = "${var.desired_size}"
  max_size           = "${var.max_size}"
  min_size           = "${var.min_size}"
  vpc_zone_identifier  = ["${var.subnet1}", "${var.subnet2}"]
  # experiment
  health_check_grace_period = 120

  launch_template {
    id      = aws_launch_template.fred_launch_template.id
    version = "$Latest"
  }
  tag {
    key                 = "Name"
    value               = "${var.name_tag}"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_policy" "fred_scale" {
  name                   = "fred scale policy"
  autoscaling_group_name = aws_autoscaling_group.fred_asg.name
  policy_type = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 40.0
  }
}
