provider "aws" {
  region = "us-west-1"
}

terraform {
  backend "s3" {
    bucket = "fred-bucket-tht"
    key    = "state/terraform.tfstate"
    region = "us-west-1"

    dynamodb_table = "fred_tht"
    encrypt        = true
  }
}

module "auto_scaling_group" {
    source = "./modules/asg"
    ami_id = "ami-0e4035ae3f70c400f"
    instance_type = "t2.micro"
    az = ["us-west-1a", "us-west-1b"]
    desired_size = 2
    min_size = 2
    max_size = 4
    name_tag = "ASG Terraform made"
    instance_profile_name = module.iam_permissions.instance_profile_name
    subnet1 = module.network.fred_subnet1
    subnet2 = module.network.fred_subnet2
    fred_sg_id = module.network.fred_sg_id
}

module "iam_permissions" {
  source = "./modules/iam"
}

module "elastic_load_balancer" {
  source = "./modules/lb"
  asg_id = module.auto_scaling_group.asg_id
  name = "fred-elb"
  az = ["us-west-1a", "us-west-1b"]
  subnets_ids = [module.network.fred_subnet1, module.network.fred_subnet2]
  sg_id = module.network.fred_sg_elb_id
  # listener
  health_check_interval = 5
  health_check_target = "HTTP:80/"
}

module "network" {
  source = "./modules/network"
  vpc_name = "fred_vpc"
  vpc_cidr = "192.168.0.0/16"
  subnet1_cidr = "192.168.1.0/24"
  subnet1_az = "us-west-1a"
  subnet1_name = "fred_subnet1"
  subnet2_cidr = "192.168.2.0/24"
  subnet2_az = "us-west-1b"
  subnet2_name = "fred_subnet2"
  public_subnet1_cidr = "192.168.0.0/24"
}
