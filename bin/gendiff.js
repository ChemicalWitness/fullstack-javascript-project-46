#!/usr/bin/env node
import { runCommander } from '../src/gendiff.js'

const program = runCommander()
program.parse(process.argv)
