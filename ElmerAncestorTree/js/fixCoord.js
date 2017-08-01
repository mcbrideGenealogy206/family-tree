function fixCoords(){
	for(i = 0; i < people.length; i++){
		document.getElementById(String(i)).coords = linkCoord(i);
		if(!people[i].hasLink){
			document.getElementById(String(i)).href = "https://mcbridegenealogy206.github.io/family-tree/"
		}
	}
}

$(document).ready(function() {
	fixCoords();
});