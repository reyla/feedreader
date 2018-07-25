/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions, the 
     * allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This test makes sure that the allFeeds variable has 
         * been defined and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds 
         * object and ensures it has a URL defined and that 
         * the URL is not empty.
         */
        it('have defined URLs', function() {
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);    
            });
            
        });

        /* This test loops through each feed in the allFeeds 
         * object and ensures it has a name defined and that 
         * the name is not empty.
         */
        it('have defined names', function() {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });
    });

    /* This test suite tests the slide-out menu */
    describe('The menu', function() {
        /* This test ensures the menu element is hidden by 
         * default based on the class attribute.
         */
        it('is hidden by default', function() {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });
         
        /* This test ensures the menu changes visibility when 
         * the menu icon is clicked. This test has two expectations: 
         * does the menu display when clicked and does it hide when clicked again.
         */         
        it('displays when menu icon is clicked and hides when clicked again', function() {
            /* use jasmine-jquery to create a spyEvent for click action */
            var spyEvent = spyOnEvent($('.menu-icon-link'), 'click');
            /* pretend to click the menu icon */
            $('.menu-icon-link').click();
            expect('click').toHaveBeenTriggeredOn($('.menu-icon-link'));
            expect(spyEvent).toHaveBeenTriggered();
            /* check that the menu is displayed */
            expect($(document.body).hasClass('menu-hidden')).toBe(false);
            /* reset spy events */
            spyEvent.reset();
            expect('click').not.toHaveBeenTriggeredOn($('.menu-icon-link'));
            expect(spyEvent).not.toHaveBeenTriggered();
            /* reset hidden class */
            $(document.body).toggleClass('menu-hidden');
            /* check that the menu is hidden */
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This test suite tests feed entries are actually loading*/
    describe('Initial Entries', function () {
        /* This test ensures when the loadFeed function is called 
         * and completes its work, there is at least a single 
         * .entry element within the .feed container.
         */
        beforeEach(function(done) {
            // make sure the feeds are loaded first
            loadFeed(0, done);
        });

        it('there is at least one entry in the feed', function() { 
            expect($('.feed .entry').length).toBeGreaterThan(1);
        });
    });

    /* This test suite tests loading new content when selecting a new feed */
    describe('New Feed Selection', function() {
        /* This test that ensures when a new feed is loaded by the 
         * loadFeed function that the content actually changes.
         */
        var first,
            second;
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                first = $('.feed').html();
                loadFeed(1, function() {
                    second = $('.feed').html();
                    done();
                });
            });
        });

        it('content changes when new feeds are loaded', function() {
            expect(first).not.toEqual(second);    
        });
    });
}());
