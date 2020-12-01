resource "aws_elb" "fred_elb" {
  name               = "${var.name}"
  # availability_zones = "${var.az}"
  # subnets 
  security_groups = ["${var.sg_id}"]
  subnets = "${var.subnets_ids}"

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "${var.health_check_target}"
    interval            = "${var.health_check_interval}"
  }

  cross_zone_load_balancing   = true
  idle_timeout                = 120
  connection_draining         = true
  connection_draining_timeout = 120

  tags = {
    Name = "${var.name}"
  }
}

resource "aws_autoscaling_attachment" "default" {
  autoscaling_group_name = "${var.asg_id}"
  elb                    = aws_elb.fred_elb.id
}
