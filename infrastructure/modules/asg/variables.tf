
variable "ami_id" {
    description = "ID of the image to create"
}

variable "instance_type" {
    description = "Type of instance "
}

variable "az" {
    description = "Availability zones"
}

variable "desired_size" {
    description = "Desired number of instances for the autoscaling group"
}

variable "min_size" {
    description = "Minium number of instances for the autoscaling group"
}

variable "max_size" {
    description = "Maxium number of instances for the autoscaling group"
}

variable "name_tag" {
    description = "Name for the tag "
}

variable "instance_profile_name" {
    description = "The name value of the instance profile"
}

variable "subnet1" {
    description = "Public subnet 1"
}

variable "subnet2" {
    description = "Public subnet 2"
}

variable "fred_sg_id" {
    description = "Id of the security group"
}
