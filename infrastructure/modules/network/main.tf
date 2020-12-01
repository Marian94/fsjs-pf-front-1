resource "aws_internet_gateway" "Igateway" {
  vpc_id = aws_vpc.fred_vpc.id
  tags = {
    Name = "fred_IGateway"
  }
}

resource "aws_eip" "fred_elastic_ip" {
  depends_on = [aws_internet_gateway.Igateway]
  vpc      = true
}
resource "aws_nat_gateway" "fred_nat_gateway" {
  allocation_id = aws_eip.fred_elastic_ip.id
  subnet_id     = aws_subnet.fred_public_subnet.id

  tags = {
    Name = "fred-nat-gateway"
  }
}

resource "aws_route_table" "r" {
  vpc_id = aws_vpc.fred_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.Igateway.id
  }

  tags = {
    Name = "fred_routetable"
  }
}

resource "aws_route_table" "fred_NAT_route_table" {
  vpc_id = aws_vpc.fred_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.fred_nat_gateway.id
  }

  tags = {
    Name = "fred-NAT-route-table"
  }
}
#------------------------------------
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.fred_subnet1.id
  route_table_id = aws_route_table.fred_NAT_route_table.id
}
resource "aws_route_table_association" "b" {
  subnet_id      = aws_subnet.fred_subnet2.id
  route_table_id = aws_route_table.fred_NAT_route_table.id
}
resource "aws_route_table_association" "c" {
  subnet_id      = aws_subnet.fred_public_subnet.id
  route_table_id = aws_route_table.r.id
}
#------------------------------------

resource "aws_vpc" "fred_vpc" {
  cidr_block = "${var.vpc_cidr}"
  enable_dns_hostnames = true
  tags = {
    Name = "${var.vpc_name}"
  }
}

resource "aws_subnet" "fred_public_subnet" {
  depends_on = [aws_internet_gateway.Igateway]
  vpc_id     = aws_vpc.fred_vpc.id
  cidr_block = "${var.public_subnet1_cidr}"
  availability_zone = "us-west-1a"

  tags = {
    Name = "fred-public-subnet"
  }

  map_public_ip_on_launch = true
}


resource "aws_subnet" "fred_subnet1" {
  depends_on = [aws_internet_gateway.Igateway]
  vpc_id     = aws_vpc.fred_vpc.id
  cidr_block = "${var.subnet1_cidr}"
  availability_zone = "${var.subnet1_az}"
  tags = {
    Name = "${var.subnet1_name}"
  }
}

resource "aws_subnet" "fred_subnet2" {
  depends_on = [aws_internet_gateway.Igateway]
  vpc_id     = aws_vpc.fred_vpc.id
  cidr_block = "${var.subnet2_cidr}"
  availability_zone = "${var.subnet2_az}"
  tags = {
    Name = "${var.subnet2_name}"
  }
}

resource "aws_security_group" "fred_sg_elb" {
  name        = "fred_sg_elb"
  description = "Allow TLS inbound traffic"
  vpc_id      = aws_vpc.fred_vpc.id

  ingress {
    description = "for http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "fred_elb_security_group"
  }
}

resource "aws_security_group" "fred_sg" {
  name        = "fred_sg"
  description = "Allow TLS inbound traffic"
  vpc_id      = aws_vpc.fred_vpc.id

  ingress {
    description = "for Security Group"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [aws_security_group.fred_sg_elb.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "fred_security_group"
  }
}