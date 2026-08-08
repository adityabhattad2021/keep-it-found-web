SHELL := /bin/bash

.DEFAULT_GOAL := help

.PHONY: help install start check backend-check backend-deploy

help:
	@printf '%s\n' \
		'Found website commands' \
		'' \
		'  make install            Install locked website and function dependencies' \
		'  make start              Start the local website' \
		'  make check              Check and build the website and voting backend' \
		'  make backend-deploy FIREBASE_PROJECT_ID=id' \
		'                          Deploy voting functions and Firestore rules'

install:
	npm ci
	npm ci --prefix functions

start:
	npm run dev

backend-check:
	npm run check --prefix functions

check:
	npm run check
	$(MAKE) backend-check

backend-deploy: check
	@test -n "$(FIREBASE_PROJECT_ID)" || (echo "FIREBASE_PROJECT_ID is required" && exit 1)
	firebase deploy --only functions:roadmap,firestore:rules --project "$(FIREBASE_PROJECT_ID)"
