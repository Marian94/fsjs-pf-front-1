
variable "vpc_name" {
    description = "The name for the VPC"
}
variable "vpc_cidr" {
    description = "The cidr Block for the VPC"
}
variable "subnet1_cidr" {
    description = "The cidr block for the public subnet 1"
}
variable "subnet1_az" {
    description = "The Availablity zone for the public subnet 1"
}
variable "subnet1_name" {
    description = "The tag Name for the private subnet 1"
}
variable "subnet2_cidr" {
    description = "The cidr block for the private subnet 2"
}
variable "subnet2_az" {
    description = "The Availablity zone for the public subnet 2"
}
variable "subnet2_name" {
    description = "The tag Name for the public subnet 2"
}

variable "public_subnet1_cidr" {
    description = "The cidr blockfor the public subnet"
}
