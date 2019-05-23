/*functions to make buttons reative*/
function group_event_button_down(group_event){
	if (group_event == 'group'){
		document.getElementById("group-button-format").style.backgroundColor = "rgba(144, 165, 169, .2)";
	}else{
		document.getElementById("event-button-format").style.backgroundColor = "rgba(144, 165, 169, .2)";

	}
}

function group_event_button_up(group_event){
	if (group_event == 'group'){
		document.getElementById("group-button-format").style.backgroundColor = "rgb(255,255,255)";
	}else{
		document.getElementById("event-button-format").style.backgroundColor = "rgb(255,255,255)";

	}
}
/****************These Funtions are to underline the categories for group/events**********************/
group_categories =["all_groups", "owner_admin",  "following", "favorites"]
event_categories =["all_events", "hosting", "rsvp", "saved"]
var curr_group_category = null; 
var curr_event_category = null; 

function setCategory(cat){
	var curr_group = document.getElementById(cat);
	if (curr_group !=null){
		curr_group.style["border-bottom"]= "2px solid"; 
		curr_group.style["border-bottom-color"]= "#1e824c"; 
		if  (group_categories.includes(cat)){
			var past_group=document.getElementById(curr_group_category);
			curr_group_category = cat;

		}
		else{
			var past_group=document.getElementById(curr_event_category);
			curr_event_category=cat;
		}
		past_group.style["border-bottom-color"]= "rgb(255,255,255)"; 
		past_group.style["border-bottom"]= "0px"; 
	}
}

function initCategories(){
	//set init category for groups to owner+admin
	var curr_group = document.getElementById("owner_admin");
	curr_group.style["border-bottom"]= "2px solid"; 
	curr_group.style["border-bottom-color"]= "#1e824c"; 
	curr_group_category = "owner_admin"; 
	//set init category for events to hosting
	var curr_group = document.getElementById("hosting");
	curr_group.style["border-bottom"]= "2px solid"; 
	curr_group.style["border-bottom-color"]= "#1e824c";  
	curr_event_category = "hosting"; 
}


/*************** Calender Reaction*********************/
function click_down(id, reverse=false){
	if (reverse==true) {
		var cal = document.getElementById(id);
		cal.style.color = "#1e824c";
		return;
	}
	var cal = document.getElementById(id);
	cal.style.color = "#696969";
}


function click_up(id, reverse=false){
	if (reverse==true) {
		var cal = document.getElementById(id);
		cal.style.color = "#696969";
		return;
	}
	var cal = document.getElementById(id);
	cal.style.color = "#1e824c";

}









const memberImg ={
	admin: "./images/admin.png", 
	owner: "./images/owner.png", 
	general: false
}

const member ={
	ADMIN: 'admin',
	OWNER: 'owner', 
	GENERAL: 'general'
} 

/*
struct to hold the member type of a group
*/
class MemberType {	 
	constructor(mem){
		if (Object.values(member).indexOf(mem)== -1){
			throw new Error("member_type, setOwner(): Not a valid group member type")
		}
		this.mem =mem; 
		this.memImg = memberImg[mem]
	}

	setMember(mem){
		if (!(mem in member)){
			throw new Error("member_type, setOwner(): Not a valid group member type")
		}
		this.mem = 	mem; 
	}
}



function buildGroupCards(){

}
