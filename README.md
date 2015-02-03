# [jQuery Fundamentals]

> jQuery Fundamentals is designed to get you comfortable working through common problems you'll be called upon to solve using jQuery. To get the most out of this site, you'll want to read the content and try the various interactive examples. Each chapter will cover a concept and give you a chance to try example code related to the concept.

## Install and development

You first need to have [`git`][git] and [`nodejs`][nodejs] installed in your machine.

- Clone this repository
- run `npm install` from the repo's root.
- run `node server` to run the server at http://localhost:4444

## Deploy

With the rights to deploy to the production server, you also need [Ansible] to be installed on your machine.

After that, you can simply run

- `npm run provision` to provision the production machine; or
- `npm run deploy` to just deploy content changes

[jQuery Fundamentals]: http://jqfundamentals.com/
[git]: http://www.git-scm.com/
[nodejs]: http://nodejs.org/
[Ansible]: http://www.ansible.com/home