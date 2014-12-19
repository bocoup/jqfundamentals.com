---
# configuration for production server

env: production
hostname: jqf
jqf_fqdn: jqfundamentals.com
ansible_ssh_user: ubuntu
ansible_ssh_private_key_file: "{{ lookup('env', 'PWD') }}/config/secrets/bocoup-app.pem"
