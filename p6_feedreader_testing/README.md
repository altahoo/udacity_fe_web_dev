# Project 6 - Feed Raader Testing

## Usage

To run the application, just simply click index.html. The tests will run automatically after loading the page.

## Test Cases

A."RSS Feeds"
	1. Loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
	2. Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
B. "The menu"
	1. Ensures the menu element is hidden by default. 
	2. Ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
C. "Initial Entries"
	1. Ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. Remember, loadFeed() is asynchronous so this test wil require the use of Jasmine's beforeEach and asynchronous done() function.
D. "New Feed Selection"
	1. Ensures when a new feed is loaded by the loadFeed function that the content actually changes. Remember, loadFeed() is asynchronous.

All tests passed.
