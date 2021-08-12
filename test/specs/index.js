
const assert = require("assert");
const path = require("path");

describe('Aitheon test', () => {

    let pause = {
        short: 1000,
        middle: 2000,
        large: 2000
    }

    function resetData() {
        // $('#name-field').getAttribute('value') == '' ? null : $('#name-field').clearValue();
        // browser.pause(pause.short);
        // $('#password-field').getAttribute('value') == '' ? null : $('#password-field').clearValue();
        // browser.pause(pause.short);
        $('.checkmark').click();
    }
    function makeId() { 
        let text = ''; 
        let possible = 'abcdefghijklmnoprstuvwxyz'; 
 
        for(let i=0; i<5; i++) 
            text = text + possible.charAt(Math.floor(Math.random() * possible.length)); 
        return text 
    }
    function createRandomName() {
        return `new-proj${Date.now().toString().slice(6, 10)}`
    }
    function generateText() {
        return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    }
    // it('Sign in with invalid email', () => {
        // browser.url('https://dev.aitheon.com/');
        // $('#signIn').click();
        // browser.pause(pause.middle);
    //     $('#name-field').addValue('Andrii');
    //     browser.pause(pause.short);
    //     $('#password-field').addValue('1234');
    //     browser.pause(pause.short);
    //     $('.checkmark').click();
    //     browser.pause(pause.short);
    //     assert.equal(false, $('#loginBtn').isClickable());
    //     browser.pause(pause.short);
    // })

    // it('Sign in with valid but not registered data', () => {
    //     browser.pause(pause.large);
    //     or use .addValue()
    //     resetData();
    //     browser.pause(pause.large);
    //     $('#name-field').addValue('Andrii@gmail.com');
    //     browser.pause(pause.short);
    //     $('#password-field').addValue('12345678');
    //     browser.pause(pause.short);
    //     $('.checkmark').click();
    //     browser.pause(pause.short);
    //     $('#loginBtn').waitForClickable({timeout: 3000});
    //     $('#loginBtn').click();
    //     browser.pause(pause.short);
    //     let errorContainer = $('.form-group.text-danger');
    //     browser.pause(pause.short);
    //     let errorText = $('.form-group.text-danger').getText();
    //     browser.pause(pause.short);
    //     errorContainer.waitForDisplayed({timeout:3000});
    //     browser.pause(pause.short);
        // assert.equal(
        //     'Email or password you’ve entered is incorrect.',
        //     errorText);
    // })

    // This test should run after test that resets form data and checkbox. 
    // This test does not open the url and doesn't go to sign in form
    
    it('Sign in with exist email and password', () => {
        
        browser.url('https://dev.aitheon.com/');
        $('#signIn').click();
        browser.pause(pause.middle);
        $('#name-field').addValue('afesenko@aitheon.com');
        browser.pause(pause.short);
        $('#password-field').addValue('Ghbdf555');
        browser.pause(pause.short);
        $('.checkmark').click();
        browser.pause(pause.short);
        $('#loginBtn').waitForClickable({timeout: 3000});
        $('#loginBtn').click();
        browser.pause(pause.short);
        $('.container.dashboard').waitForExist({timeout: 60000})
    })
    it('Select an organization', () => {
        browser.pause(pause.middle);
        $('.navbar').$('.navbar__right_section').$('.intro-step').click();
        browser.pause(pause.large);
        $('.dropdown-item.organization-list').$('.dropdown-submenu').$$('li')[2].click();
    })
    it('open PM tool', () => {
        browser.pause(pause.middle);
        $('.intro-step.navbar-toggler').$('button').click();
        browser.pause(pause.short);
        let pmButton = $('.sidebar__list-services').$('.service-icon.project_manager');
        pmButton.waitForExist({timeout: 30000})
        pmButton.click();
    })
    it('Open "new project" popup', () => {
        $('.project-dashboard').waitForExist({timeout: 30000})
        browser.pause(pause.middle);
        $('.project-dashboard__head-right').$('button').click();
        browser.pause(pause.short);
        let modalContent = $('modal-container').$('.modal-dialog').$('.modal-content');
        modalContent.waitForDisplayed({timeout:10000});
        let modalTitle = modalContent.$('.modal-header').$('h4');
        assert.equal('New Project', modalTitle.getText());
    })
    describe('Creating a new Project', () => {
        let projName;

        describe('Set data for new project', () => {

            let modalContent;

            it('', () => {
                modalContent = $('modal-container').$('.modal-dialog').$('.modal-content');
            })

            it('Set the name', () => {
                
                projName = createRandomName();
                let nameField = modalContent.$('.modal-body').$('.project-form__name'); 
                nameField.waitForDisplayed({timeout: 10000});
                nameField.click();
                browser.pause(pause.short);
                nameField.$('input').addValue(projName);

            })

            it('Set description', () => {

                browser.pause(pause.short);
                let DescField = modalContent.$('.modal-body').$('.project-form__section');
                DescField.$('textarea').addValue(`some description about the project`);

            })

            it('Set KEY', () => {

                let KeyField = modalContent.$('.modal-body').$('.project-form__key-wrapper');
                browser.pause(pause.short); 
                KeyField.$('input').addValue(makeId()); 

            })

            it('Add issue board', () => {

                let addIssueBttn = modalContent.$('.switch'); 
                browser.pause(pause.short); 
                addIssueBttn.click(); 

            })

            it('Submit creation', () => {

                let submitBttn = modalContent.$('.d-flex.justify-content-end').$('button=Create');
                browser.pause(pause.short); 
                submitBttn.click(); 

            })
            
            it('check if the project has been created and exists on the "All Project" list', () => {
                let pjList = $('.project-dashboard__list');
                browser.pause(pause.large)
                pjList.waitForDisplayed({timeout:60000});
                // long pause because closing the creation popup takes much more time for now
                browser.pause(pause.large);
                browser.pause(pause.large);
                browser.pause(pause.large);
                let lastProj = $$('.project-dashboard__card')[$$('.project-dashboard__card').length-1];
                browser.pause(pause.large);
                let nameField = lastProj.$('.projCard__body').$('.projCard__top').$('.d-flex').$$('div')[0];
                let lastProjName = nameField.getText();
                assert.equal(
                    projName,
                    lastProjName);
            })
        })
    })
    describe('open a project', () => {

        it('open a project', () => {

            // browser.debug();
            let pjList = $('.project-dashboard__list');
            pjList.waitForDisplayed({timeout:60000});
            let lastProj = pjList.$$('.project-dashboard__card')[$$('.project-dashboard__card').length-1];
            lastProj.click();

        })

        it('check if the main board is active' , () => {
            
            let MainBoardActive = 'nav-link active';
            let container = $('.container');
            container.waitForDisplayed({timeout: 60000});
            browser.pause(pause.large);
            let mainBoardBttnClass = container.$('.menu').$('.nav').$$('li')[1].$('a').getAttribute('class');
            assert.equal(MainBoardActive, mainBoardBttnClass);

        })
        describe('Add new task', () => {
            
            it('open the task creation popup', () => {

                let stagesContainer = $('.stageScroll');
                stagesContainer.waitForDisplayed({timeout: 20000});
                // browser.debug();
                let toDoStage = stagesContainer.$('.cdk-drop-list').$$('div')[1]
                let tasksList = toDoStage.$('.example-list');
                let addTaskBttn = tasksList.$('button');
                addTaskBttn.click();
                browser.pause(pause.large);
    
            })

            describe('set data for the new task', () => {
                
                let modalLeftSide;
                let modalRightSide;

                function selectElement(select, elCalss1, elCalss2) {
                    browser.pause(pause.large);
                    select.click();
                    let dropdownPanel = select.$(elCalss1);
                    dropdownPanel.waitForDisplayed({timeout: 10000});
                    browser.pause(pause.large);
                    let option = dropdownPanel.$(elCalss2);
                    option.click();
                }
                
                it('', () => {
                    let newTaskModal = $('modal-container');
                    newTaskModal.waitForDisplayed({timeout: 10000});
                    modalLeftSide = newTaskModal.$('.modal-content').$('.task-form').$('.task-form__left');
                    modalRightSide = $('modal-container').$('.modal-content').$('.task-form').$('.task-form__right');
                })

                it('set the name', () => {

                    let nameField = modalLeftSide.$('.task-form__task-name').$('input');
                    nameField.setValue(`new task${randomNumb()}`);
    
                })

                // don't need to select a type cause the type is "task" by default
                it('select a type', () => {

                    let select = modalLeftSide.$$('div')[2].$('ng-select');
                    selectElement(select, 'ng-dropdown-panel', 'span=STORY');

                })

                it('set description', () => {

                    let descField = modalLeftSide.$$('.mb--24')[1].$('textarea');
                    descField.setValue(generateText());

                })

                it('select a stage', () => {

                    let select = modalRightSide.$$('.mb--24')[0].$('ng-select');
                    selectElement(select,'ng-dropdown-panel', 'span=Backlog');

                })

                it('select priority', () => {

                    let select = modalRightSide.$$('.mb--24')[1].$('ng-select');
                    selectElement(select, 'ng-dropdown-panel', 'div=Highest');

                })
            })
        })
    })
})