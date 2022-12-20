# Project 'Difference calculator'
______
[![Actions Status](https://github.com/pollyleyka/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/pollyleyka/frontend-project-46/actions)
[![Node CI](https://github.com/pollyleyka/frontend-project-46/actions/workflows/node-js.yml/badge.svg)](https://github.com/pollyleyka/frontend-project-46/actions/workflows/node-js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/cd0baada2efa7fd8d25b/maintainability)](https://codeclimate.com/github/pollyleyka/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cd0baada2efa7fd8d25b/test_coverage)](https://codeclimate.com/github/pollyleyka/frontend-project-46/test_coverage)
## Description of the project:
_**Difference Calculator**_ is a CLI utility for calculating differences between two data structures.
For example, there are two json files. The first file represents the state before the change, the second after. The result of the utility is the difference between the two states.
**_Utility features_**:
- Support for different input formats: yaml, json
- Report generation in the form of plain text, stylish and json
_____
## Requirements
- OS - *nix like systems or customized Windows
- The version of Node used when writing the project is v18.4.0
- Minimum Node version >= 16.x
_____
## Instructions for installing and running:
- Clone the repository with the project
```
git clone https://github.com/pollyleyka/frontend-project-46.git
```
- Go to the directory with the project
```
cd frontend-project-46/
```
- Install the project dependencies 
```
make install
```
- Install the package with the utility locally
```
npm link
```
- After installation, you can learn how to use the utility using the **gendiff** command and the **-h** flag.

**Demonstration**:

### compare flat json

[![asciicast](https://asciinema.org/a/540886.svg)](https://asciinema.org/a/540886)

### compare flat yaml

[![asciicast](https://asciinema.org/a/543159.svg)](https://asciinema.org/a/543159)

### compare json/yaml tree

[![asciicast](https://asciinema.org/a/545401.svg)](https://asciinema.org/a/545401)

### make output in different formats. Stylish is default. Plain works like this:

[![asciicast](https://asciinema.org/a/546074.svg)](https://asciinema.org/a/546074)

### show differance tree in json format

[![asciicast](https://asciinema.org/a/546147.svg)](https://asciinema.org/a/546147)
