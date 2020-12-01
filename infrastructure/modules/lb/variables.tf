variable "asg_id" {
    description = "Id of the Auto scaling group"
}

variable "az" {
    description = "Availability zones"
}
variable "name" {
    description = "Name for the Elastic load balancer"
}

variable "health_check_interval" {
    description = "Seconds to wait for health check"
}

variable "health_check_target" {
    description = "port target for health check"
}

variable "subnets_ids" {
    description = "port target for health check"
}

variable "sg_id" {
    description = "security group id for the elb"
}