output "instance_profile_name" {
  value = "${aws_iam_instance_profile.fred_ec2_profile.name}"
}