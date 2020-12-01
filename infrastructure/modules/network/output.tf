output "fred_subnet1" {
    value = "${aws_subnet.fred_subnet1.id}"
}

output "fred_subnet2" {
    value = "${aws_subnet.fred_subnet2.id}"
}

output "fred_sg_elb_id" {
    value = "${aws_security_group.fred_sg_elb.id}"
}

output "fred_sg_id" {
    value = "${aws_security_group.fred_sg.id}"
}