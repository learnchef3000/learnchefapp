#!/bin/bash -eu
#
# Copyright 2025 LearnChef3000

# This script should be run first time the server is deployed to prime the database. 
# This script can be run multiple times, and is idempotent. 

# Run migrations and static.
python3 manage.py migrate
python3 manage.py collectstatic --noinput --clear

# Load configurations
python3 manage.py loaddata demo_config.yaml

# Create superuser (password set in DJANGO_SUPERUSER_PASSWORD)
# Idempotency: this command is allowed to fail on second application
python3 manage.py createsuperuser --username admin --email noop@example.com --noinput || true

# Create products through management commands.
python3 manage.py create_new_product \
    --name "Pineapple Bee" \
    --image "store/fixtures/media/pineapple-bee.png" \
    --description "This lil guy is buzzing with excitement, ready to lead the next disco samba!" \
    --price "25.00" \
    --discount 17 \
    --inventory_count 27 \
    --testimonials 5

python3 manage.py create_new_product \
    --name "Wooden Tiger" \
    --image "store/fixtures/media/log-tiger.png" \
    --description "Hand-carved from oak, this king of the jungle will bring joy to children young and old." \
    --price "7.49" \
    --inventory_count 4  \
    --testimonials 5

python3 manage.py create_new_product \
    --name "Star Unicorn" \
    --image "store/fixtures/media/unicorn-star.png" \
    --description "This inflatable unicorn will bring delight to your next family gathering." \
    --price "12.49" \
    --inventory_count 71 \
    --testimonials 5

# Last added entry is the active product
python3 manage.py create_new_product \
    --name "Sparkly LearnChef" \
    --image "store/fixtures/media/learnchef-star.png" \
    --description "Never before has an learnchef been as sparkly. Sure to be a star ingredient in your next salad." \
    --price "2.99" \
    --discount "14" \
    --inventory_count 42 \
    --testimonials 5