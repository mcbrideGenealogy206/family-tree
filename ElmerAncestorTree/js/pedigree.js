/* pedigree.js */
/* most of the code written by Ben Crowder */

var linelength = 200;

function person(name, gender, lifespan, place, hasLink) {
	this.x = 100;
	this.y = 100;
	this.name = name;
	this.gender = gender;
	this.lifespan = lifespan;
	this.place = place;
	this.spouse = null;
	this.hasLink = hasLink;

	this.draw = function() {
		var textoffset = this.x + 2;//was 10

		// First, draw the baseline
		this.context.strokeStyle = "#111";
		this.context.beginPath();
		this.context.lineTo(this.x, this.y);
		this.context.lineTo(this.x + linelength, this.y);
		this.context.stroke();

		if (this.spouse) {
			// And draw the marriage line
			this.context.beginPath();
			this.context.lineTo(this.x, this.y);
			this.context.lineTo(this.spouse.x, this.spouse.y);
			this.context.stroke();
		}

		// Now draw the name
		this.context.font = "bold 14px Arial";
		this.context.textAlign = "left";
		if(this.hasLink){
			this.context.fillStyle = "#0000ff"
		}
		else{
			this.context.fillStyle = "#000";
		}
		this.context.fillText(this.name, textoffset, this.y - 7);

		// And the birth info
		this.context.font = "11px Arial";
		this.context.fillStyle = "#999";
		this.context.fillText(this.lifespan, textoffset, this.y + 15);
		this.context.fillText(this.place, textoffset, this.y + 28);
	}

	this.isFatherOf = function(child, gen) {
		this.x = child.x + linelength;
		this.y = child.y - (1000 / Math.pow(2,gen));//numerator was 250
	}

	this.isMotherOf = function(child, gen) {
		this.x = child.x + linelength;
		this.y = child.y + (1000 / Math.pow(2,gen)); //was child.y + (250 / gen);
	}

	this.isMarriedTo = function(spouse) {
		this.spouse = spouse;
	}
}

function initFamily(child, father, mother, gen) {
	father.isFatherOf(child, gen);
	mother.isMotherOf(child, gen);
	father.isMarriedTo(mother);
}

var people = new Array();

function linkCoord(i){
	output = "";
	output = output.concat(String(people[i].x));
	output = output.concat(",");
	output = output.concat(String(people[i].y));
	output = output.concat(",");
	output = output.concat(String(people[i].x + linelength));
	output = output.concat(",");
	output = output.concat(String(people[i].y + 15));
	return output;
}
people.push(new person("Elmer Everett McBride", "m", "", "Imboden, AR", false),//0
	new person("Thomas Franklin McBride", "m", "", "Colusa County, CA", false),//1
	new person("Rebecca Margret Weir", "f", "", "Arkansas", false),//2
	new person("Isaac V McBride", "m", "1842-1913", "Boyle County, Kentucy", true),//3
	new person("Frances Minton", "f", "", "Tennessee", false),//4
	new person("John McBride", "m", "1804-1860", "Kentucky", true),//5
	new person("Olive C Vanarsdall", "f", "1813-1839", "Kentucky", true),//6
	new person("Isaac B Vanarsdall", "m", "1786-1866", "Pennsylvania", true),//7
	new person("Ann Coulter", "f", "1784-?", "Kentucky", true),//8
	new person("John Coulter", "m", "", "", true),//9
	new person("Unknown", "f", "", "", false),//10
	new person("George Franklin Weir", "m", "1846-1903", "Arkansas", false),//11
	new person("Martha J Smith", "f", "1853-?", "Arkansas", false),//12
	new person("James Adam Weir","m", "1819-1896", "Iredell County, NC", false),//13
	new person("Sarah Elizabeth Sloan","f", "1820-1885", "Iredell County, NC", false),//14
	new person("James Wier","m","","",false),//15
	new person("Margaret Carrigan", "f", "", "",false),//16
	new person("David McBride", "m", "1784-1852", "North Carolina", false),//17
	new person("Eleanor Ridgeway", "f", "1784-1847", "North Carolina", false),//18
	new person("William Carrigan", "m", "1760-1844", "", false),//19
	new person("Catherine", "f", "", "", false)//20
);

$(document).ready(function() {
	// Prepare the canvas
	var canvas = document.getElementById("chart");

	// Get context and let the game know about it
	if (canvas.getContext) {
		var context = canvas.getContext('2d');

		// Iniitalize context
		for (var p in people) { people[p].context = context; }

		// Base point
		people[0].x = 50;
		people[0].y = 1050;     //was 250

		initFamily(people[0], people[1], people[2], 1);//modified all generations. origionally gen 2
		initFamily(people[1], people[3], people[4], 2);
		initFamily(people[3], people[5], people[6], 3);
		initFamily(people[6], people[7], people[8], 4);
		initFamily(people[8], people[9], people[10], 5);
		initFamily(people[2], people[11], people[12], 2);
    initFamily(people[11], people[13], people[14], 3);
    initFamily(people[13], people[15], people[16], 4);
    initFamily(people[5], people[17], people[18], 4);
    initFamily(people[16], people[19], people[20], 5);
		for (var p in people) { people[p].draw(); }
	}
});

