resource "aws_iam_role_policy" "fred_ec2_policy" {
    name = "fred_ec2_policy"
    role = aws_iam_role.fred_ec2_role.id

    policy = <<-EOF
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "ecr:GetAuthorizationToken",
                    "ecr:BatchCheckLayerAvailability",
                    "ecr:GetDownloadUrlForLayer",
                    "ecr:BatchGetImage",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ],
                "Resource": "*"
            }
        ]
    }
  EOF
}

resource "aws_iam_role" "fred_ec2_role" {
    name = "fred_ec2_role"
    assume_role_policy = <<-EOF
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "sts:AssumeRole",
                "Principal": {
                    "Service": "ec2.amazonaws.com"
                },
                "Effect": "Allow",
                "Sid": ""
            }
        ]
    }
    EOF
}

resource "aws_iam_instance_profile" "fred_ec2_profile" {
    name = "fred_ec2_profile"
    role = "${aws_iam_role.fred_ec2_role.name}"
}