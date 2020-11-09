    var crudApp = new function () {

        this.Users = [
            { ID: '1', firstName: 'Mark', lastName: 'Otto', Handle: "@mdo"},
            { ID: '2', firstName: 'Jacob', lastName: 'Thornton', Handle: "@fat" },
            { ID: '3', firstName: 'Larry', lastName: 'the Bird', Handle: "@twitter" }
        ]

     
        this.data = [];

        this.createTable = function () {

            // value for table header
            for (var i = 0; i < this.Users.length; i++) {
                for (var key in this.Users[i]) {
                    // if there is no match push key into data
                    if (this.data.indexOf(key) === -1) {
                        this.data.push(key);
                    }
                }
            }

            // create a table
            var table = document.createElement('table');
            table.setAttribute('id', 'user');  

            // create a row for header
            var tr = table.insertRow(-1);              

            for (var h = 0; h < this.data.length; h++) {
                // add table header
                var th = document.createElement('th');
                th.innerHTML = this.data[h]; 
                tr.appendChild(th);
            }

            // add rows in json format
            for (var i = 0; i < this.Users.length; i++) {
                // create new row
                tr = table.insertRow(-1);           

                for (var j = 0; j < this.data.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = this.Users[i][this.data[j]];
                }

                // create and add elements to table

                this.td = document.createElement('td');

                // *** CANCEL OPTION.
                tr.appendChild(this.td);
                var lblCancel = document.createElement('label');
                lblCancel.innerHTML = '✖';
                lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
                lblCancel.setAttribute('style', 'display:none;');
                lblCancel.setAttribute('title', 'Cancel');
                lblCancel.setAttribute('id', 'lbl' + i);
                this.td.appendChild(lblCancel);

                // *** SAVE.
                tr.appendChild(this.td);
                var btSave = document.createElement('label');
                btSave.innerHTML = '✔️';
                btSave.setAttribute('onclick', 'crudApp.Save(this)');
                btSave.setAttribute('style', 'display:none;');
                btSave.setAttribute('title', 'Save');
                btSave.setAttribute('id', 'Save' + i);
                this.td.appendChild(btSave);

                
                // *** UPDATE.
                tr.appendChild(this.td);
                var btUpdate = document.createElement('label');
                btUpdate.innerHTML = '📝';
                btUpdate.setAttribute('onclick', 'crudApp.Update(this)');
                btUpdate.setAttribute('title', 'Edit');
                btUpdate.setAttribute('id', 'Edit' + i);
                this.td.appendChild(btUpdate);


                // *** DELETE.

                tr.appendChild(this.td);
                var btDelete = document.createElement('label');
                btDelete.innerHTML = '🗑️';
                btDelete.setAttribute('onclick', 'crudApp.Delete(this)');
                btDelete.setAttribute('title', 'Delete');
                btDelete.setAttribute('id', 'Delete' + i);
                this.td.appendChild(btDelete);

            }
           

            tr = table.insertRow(-1);           

            for (var j = 0; j < this.data.length; j++) {
                var newCell = tr.insertCell(-1);
                if (j >= 1) {
                        // create and add textbox
                        var tBox = document.createElement('input');          
                        tBox.setAttribute('type', 'text');
                        tBox.setAttribute('value', '');
                        newCell.appendChild(tBox);
                    
                }
            }

            this.td = document.createElement('td');
            tr.appendChild(this.td);

            var btNew = document.createElement('input');

            btNew.setAttribute('type', 'button');       
            btNew.setAttribute('value', 'New');
            btNew.setAttribute('id', 'New' + i);
            btNew.setAttribute('style', 'background-color:green; border-radius:5px; padding:5px; width:68px');
            btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');       
            this.td.appendChild(btNew);

            var div = document.getElementById('container');
            div.innerHTML = '';
            div.appendChild(table);    // add table to web page
        };

        // cancel
        this.Cancel = function (oButton) {

            // hide cancel button
            oButton.setAttribute('style', 'display:none; float:none;');

            var activeRow = oButton.parentNode.parentNode.rowIndex;

            // hide save button
            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:none;');

            // show update button again
            var btUpdate = document.getElementById('Edit' + (activeRow - 1));
            btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

            var tab = document.getElementById('user').rows[activeRow];

            for (i = 0; i < this.data.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                td.innerHTML = this.Users[(activeRow - 1)][this.data[i]];
            }
        }


        // edit
        this.Update = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('user').rows[activeRow];

            for (i = 1; i < 4; i++) {
              
                    var td = tab.getElementsByTagName("td")[i];
                    // textbox
                    var ele = document.createElement('input');      
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', td.innerText);
                    td.innerText = '';
                    td.appendChild(ele);
                
            }

            var lblCancel = document.getElementById('lbl' + (activeRow - 1));
            lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:block; margin-left:30px; float:left;');

            // hide save button
            oButton.setAttribute('style', 'display:none;');
        };
        

        // delete
        this.Delete = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            //delete row
            this.Users.splice((activeRow - 1), 1); 
            // refresh table
            this.createTable();
        };

        // save data
        this.Save = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('user').rows[activeRow];

            // edit data
            for (i = 1; i < this.data.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  //check if element is a textbox or select
                    // save data
                    this.Users[(activeRow - 1)][this.data[i]] = td.childNodes[0].value;      
                }
            }
            this.createTable(); // refresh table
        }

        // create new
        this.CreateNew = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('user').rows[activeRow];
            var obj = {};

            // add new value to array
            for (i = 1; i < this.data.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // check if element is a textbox or select
                    var txtVal = td.childNodes[0].value;
                    if (txtVal != '') {
                        obj[this.data[i]] = txtVal.trim();
                    }
                    else {
                        obj = '';
                        alert('All spaces must be filled!');
                        break;
                    }
                }
            }
            // new id
            obj[this.data[0]] = this.Users.length + 1;     

            if (Object.keys(obj).length > 0) {      // check if object is not empty
                this.Users.push(obj);             // add data to array
                this.createTable();                 // refrech table
            }
        }

    }

    crudApp.createTable();


    