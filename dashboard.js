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






/************* Different Type of Clubs*************/


const member ={
	ADMIN: {icon:'admin-icon', txt:'Admin', img:"./images/admin.png"},
	OWNER: {icon:'owner-icon', txt:'Owner', img:"./images/owner.png"}, 
	GENERAL: {icon:'general-icon', txt:'', img:''}
} 

const faveImg={
	0:"./images/star.svg",
	1:"./images/green_star.svg"}

// holds location
class Group {
	constructor(handle, g_img){
		this.handle = handle;
		this.g_img = g_img; 
		this.state = "";
		this.city = "";
		this.country = "";
		this.descr = "";
	}

	setLocation(state, city, country){
		this.state = state;
		this.city = city;
		this.country = country;
	}

	setDescr(descr){
		this.descr = descr; 
	}
}


/*
struct to hold the member type of a group
*/
class ClubMember {	
/*
Class constructor for a group

Inputs:
	mem (const member): type of member "general", "admin", or "owner"
	loc (instanceof Location): The state, city, and country of the club

*/ 
	constructor(mem, group){
		this.mem =mem; 
		this.group= group; 
		this.fav = getRandomInt(2);
		this.favImg = faveImg[this.fav]
		this.chatnumber = getRandomInt(100);

	}

	setMember(mem){
		if (!(mem in member)){
			throw new Error("member_type, setOwner(): Not a valid group member type")
		}
		this.mem = 	mem; 
	}

}

function getRandomAccess() {
	let member_prob = .7;
	let rnd = Math.random();
	if (rnd<=member_prob){
		return 2;
	}else{
		return getRandomInt(2); 
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

clubList = []
function initGroupCards(){
	let club_handles = ["cs_Faculty_nu", "devClub_nu", "cookology_nu", "_64Squares_nu", "GLAC_nu", "AEPI_nu", "kelloggPhdSoccer_nu",
					"freeDaBelly_nu", "asa_nu", "bBurlesque_nu", "cs343_studygrouuup9", "cheesClub_nu", "boogo_party"]

	let club_descr = ["Faculty's of NU's Computer Science Dept","Northwestern's Software Development Club", 
	                "A culinary arts student group",
	                "A chess playing club at Northwestern", 
	                "The Graduate Leadership & Advocacy Council",
	                "Northwestern's  Alpha Epsilon Pi Fraternity",
	                "Pickup soccer games", 
	                "Students in search of free food", 
	                "Northwestern's African Students Association", 
	                "Burlesque dance interest group at Northwestern",
	                "Studying for Operating Systems Spring 2019 ",
	                "Do you like cheese?",
	                "Black out or get out party series by EPIC"]

	let club_images = ["./images/css.jpg", "./images/devclub.png", "./images/cookology_nu.png", "./images/64Squares_nu.jpg", "./images/glac_nu.png",
					"./images/aepi_nu.png", "./images/kelloggsoccer.jpeg", "./images/freefood.jpg", "./images/asa_nu.jpeg",
					"./images/burlesque.jpg", "./images/study_group.jpg", "./images/coffee_guy.jpg", "./images/boog.jpg"]


	let memberOptions = [member.ADMIN, member.OWNER, member.GENERAL];

	//Randomly set permissions and favorites
	for (let i = 0; i<club_handles.length; i++){
		//Set up the group information
		let group = new Group(club_handles[i], club_images[i]);
		group.setLocation("IL","Evanston","USA");
		group.setDescr(club_descr[i]);

		//set up the rest of the info
		let club = new ClubMember(memberOptions[getRandomAccess()], group);
		//append to vector. 
		clubList.push(club);
	}
}

//initGroupCards();


/******************************** Format Function **********************************/
function getFormat(club){
	let clubHandle =club.group.handle;
	let clubImg = club.group.g_img;
	let clubDesc = club.group.descr;
	let clubState = club.group.state;
	let clubCountry = club.group.country;
	let clubCity = club.group.city;
	let memIcon = club.mem.icon;
	let memTxt =  club.mem.txt;
	let memImg =  club.mem.img;
	let favImg = club.favImg;
	let chatnumber = club.chatnumber;
	
 	let formatt= `<div id=${clubHandle} class="group-card">
 		<!--Header of a group card-->
	 	<div class="group-header">
	 		<div class ="profile-pic-small">
				<img src = ${clubImg} >
			</div>

			<div class = "group-txt-info">
				<div class="group-handle">
					${clubHandle}
				</div>
				<div class="group-txt-footer">
					<div class="group-desc">
						${clubDesc}
					</div>
					<div class="group-loc">
						<span class>
							${clubCity} &#183; ${clubState}  &#183; ${clubCountry}
						</span>
					</div>	
				</div>
			</div>`

    


	if (memTxt==''){
		formatt+=`
				</div>
				 	<!--footer of a group card-->
					<div class="group-footer">
					    	<div class="blank-chat" id="blank-chat" style="display: inline-block;">
					    	</div>

				    	<div id="favs-icon" style="display: inline-block;" onclick="togglefav('${clubHandle}')">
							<img  src=${favImg} alt="Fav" >
						</div>
					</div>
			 	</div>`;

	}else{
		formatt+=`<div class="priviledge-lvl">
					<div id=${memIcon}>
						<img src=${memImg} alt=${memTxt}>
				 	</div>	
					${memTxt}
				  </div>


					</div>
					 	<!--footer of a group card-->
						<div class="group-footer">
							<!--<a href="#" style="color:inherit;" onmousedown="click_down('chat',true)" onmouseup="click_up('chat',true)">-->
						    	<div class="chat" id="chat" style="display: inline-block;">
						    		Chat
						    		<div class="alerts" id="alerts" style="display: inline-block;">
						    			${chatnumber}
						    		</div>
						    	</div>
						    <!--</a>-->

					    	<div id="favs-icon" style="display: inline-block;" onclick="togglefav('${clubHandle}')">
								<img  src=${favImg} alt="Fav">
							</div>
						</div>
				 	</div>`;
	}
 	return formatt;
}

function noCards(text){
	return `<div class="no-cards">
		<h2 style="margin:0;padding:0;"> ${text} </h2>
	</div>`; 
}

/*********** Reactive Functions ***************/
activehandles =[];

function rm_handles(){
	for (var a in activehandles){
		let id = document.getElementById(a)
		if (id !=null){
			id.outerHTML = "";
		}
	}
}

function all_groups(){
	let active = [];
	let formatt = "";

	for (let i = 0; i<clubList.length; i++){
		active.push(clubList[i].group.handle);
		formatt+=getFormat(clubList[i]);
	}
	/*remove old handles*/
	rm_handles();

	/*Add new shit*/
	var groupblock = document.getElementById("block-group");
	if (formatt==""){
		groupblock.innerHTML = noCards('No Groups');
	}else{
		groupblock.innerHTML = formatt;
	}
	return active; 
}

function owner_admin(){
	let active = [];
	let formatt = "";
	for (let i = 0; i<clubList.length; i++){
		memType = clubList[i].mem;
		if (memType==member.ADMIN || memType==member.OWNER){
			active.push(clubList[i].group.handle);
			formatt+=getFormat(clubList[i]);
		}

	}
	/*remove old handles*/
	rm_handles();

	/*Add new shit*/
	var groupblock = document.getElementById("block-group");
	if (formatt==""){
		groupblock.innerHTML = noCards('Not an Owner/Admin of any Group'); 
	}else{
		groupblock.innerHTML = formatt;
	}
	return active; 


}

function favorites(){
	let active = [];
	let formatt = "";
	for (let i = 0; i<clubList.length; i++){
		memType = clubList[i].mem;
		if (clubList[i].fav==1){
			active.push(clubList[i].group.handle);
			formatt+=getFormat(clubList[i]);
		}

	}
	/*remove old handles*/
	rm_handles();

	/*Add new shit*/
	var groupblock = document.getElementById("block-group");
	if (formatt==""){
		groupblock.innerHTML = noCards('No Favorite Groups'); 
	}else{
		groupblock.innerHTML = formatt;
	}	
	return active; 
}

function following(){
	let active = [];
	let formatt = "";
	for (let i = 0; i<clubList.length; i++){
		memType = clubList[i].mem;
		if (!(memType==member.ADMIN || memType==member.OWNER)){
			active.push(clubList[i].group.handle);
			formatt+=getFormat(clubList[i]);
		}

	}
	/*remove old handles*/
	rm_handles();

	/*Add new shit*/
	var groupblock = document.getElementById("block-group");
	if (formatt==""){
		groupblock.innerHTML = noCards('Not Following any Groups'); 
	}else{
		groupblock.innerHTML = formatt;
	}
	return active; 
}






/*********** Wrapper for the react Functions ***************/


function getGroups(gType){
	switch(gType){
		case "all_groups":
			activehandles = all_groups(); 
			break;
		case "owner_admin":
			activehandles = owner_admin(); 
			break;
		case "favorites":
			activehandles = favorites(); 
			break;
		default:
			activehandles = following(); 
	}
}


/*Set up the default value for groups selected when user first opens page*/
function default_groups(){
	let active = [];
	let formatt = "";	
	for (let i = 0; i<clubList.length; i++){
		memType = clubList[i].mem;
		if (memType==member.ADMIN || memType==member.OWNER){
			active.push(clubList[i].group.handle);
			formatt+=getFormat(clubList[i]);
		}

	}
	activehandles = active; 
}




/****************These Funtions are to underline the categories for group/events**********************/
group_categories =["all_groups", "owner_admin",  "following", "favorites"]
event_categories =["all_events", "hosting", "rsvp", "saved"]
curr_group_category = null; 
curr_event_category = null; 
is_favoritesOn = false;

function setCategory(cat){
	var curr_group = document.getElementById(cat);
	if (curr_group !=null){
		curr_group.style["border-bottom"]= "2px solid"; 
		curr_group.style["border-bottom-color"]= "#1e824c"; 
		is_favoritesOn = (cat == "favorites"); 
		if  (group_categories.includes(cat)){
			var past_group=document.getElementById(curr_group_category);
			curr_group_category = cat;
			/*Change elements selected*/
			getGroups(cat);

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


/************ make the header stick************/

/*Allows one to click the star and have the website be responsive to a click*/
/* global variable defined elsewhere for this is `is_favoirtesON`*/

function togglefav(handle){
	//console.log(handle);
	pic = "#"+handle+" "+"#favs-icon img"
	picid = document.querySelectorAll(pic)[0]
	//console.log(picid);

	is_favsPresent = false; 
	for (let i = 0; i<clubList.length; i++){


		if (clubList[i].group.handle == handle){
			prevfav = clubList[i].fav; 
			clubList[i].fav = (prevfav === 1) ? 0 : 1;
			clubList[i].favImg = faveImg[clubList[i].fav]; 
			picid.src = faveImg[clubList[i].fav]; 

			/*Check if `favorites` tab` is selected, */
			favs = document.getElementById("favorites");
			if (is_favoritesOn && prevfav==1){
				//console.log(favs.style["border-bottom-color"]);
				document.getElementById(handle).outerHTML="";
			}
		}
		//If atleast one group card has `favs` then is_favsPresent == true
		if (clubList[i].fav && !is_favsPresent){
			is_favsPresent = true;
		}

	}
	/*Display a splash screen when no cards left in fav's*/
	if (!(is_favsPresent)){
		document.getElementById("block-group").innerHTML = noCards('No Favorite Groups');
	}
	return;

}







