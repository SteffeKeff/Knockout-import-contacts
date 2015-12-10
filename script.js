var separator = /\t/;
var numberOfColumns = 0;
var Globals = {
  rows: "",
  columns: ""
};

function values(data){
  var values = data.split(separator);

  return values.splice(0, numberOfColumns); //Will splice so values is not more than columns
}

function toJson(test){
  console.log(test.rows);
}

function AppViewModel() {
  var self = this;
  self.text = ko.observable("");
  self.importedContacts = ko.observable("")

  self.numberOfContacts = ko.computed(function(){
    return (self.importedContacts().match(/\n/g) || []).length;
  });

  self.columnNames = ko.computed(function(){
    var firstLine =  self.importedContacts().split(/\n/)[0];
    var columns = firstLine.split(separator);
    numberOfColumns = columns.length;
    Globals.columns = columns;
    return columns;
  });

  self.rows = ko.computed(function(){
    var rows =  self.importedContacts().split(/\n/);
    rows.shift(); //Removes first line(Column names...)
    Globals.rows = rows.slice();
    var topFive = rows.splice(0,5);

    return topFive;
  });

  self.importContacts = function(){
    while(self.text().slice(-1) === '\n'){ //While last character is a "new line" then remove it
      self.text(self.text().slice(0,self.text().length-1));
    };
    self.importedContacts(self.text()); //importedContacts will get the value of textarea
    toJson(Globals);
    $('textarea').val(''); //clean the textarea
  }
}

ko.applyBindings(new AppViewModel());
