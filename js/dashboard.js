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
		cal.style.color = "rgba(0, 100, 0,1)";
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
	cal.style.color = "rgba(0, 100, 0,1)";

}


/**************************** THESE ARE THE INTERFACES FOR RECORDING EVENTS: Mainly for Event Cards**************************/
class EventLocation{
	constructor(street="", city="", state="", loc_name=""){
		this.street = street;
		this.city = city;
		this.state = state;
		this.loc_name = loc_name; 		
	}
}

class EventTime{
	constructor(month="", day="", year="", dayOfWeek="",startTime="", endTime=""){
		this.month = month;
		this.day = day;
		this.dayOfWeek=dayOfWeek;
		this.startTime = startTime;
		this.endTime = endTime;
		this.year = year
	}
}

class EventMetaData{
	constructor(event_name="", event_img="",event_imgType="",  rsvps=""){
		this.rsvps = rsvps;	
		this.event_name = event_name;	
		this.event_img = event_img;
		this.event_imgType = event_imgType;
	}
}

/* getRandomInt(100) Class to hold an event instance*/
class Event{
	constructor(eventlocation, eventtime, metaData, is_saved, is_rsvp){
		if (!(eventlocation instanceof EventLocation) || !(eventtime instanceof EventTime) || !(metaData instanceof EventMetaData)){
			throw new Error("Event: Incorrect input type");
		}
		this.loc = eventlocation;
		this.time = eventtime;
		this.metaData = metaData;	
		this.is_saved = is_saved;
		this.is_rsvp = is_rsvp;
	}
}


/**************************** THESE ARE THE INTERFACES FOR Groups: Mainly for Group Cards**************************/
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

const member ={
	ADMIN: {icon:'admin-icon', txt:'Admin', img:"./images/admin.png"},
	OWNER: {icon:'owner-icon', txt:'Owner', img:"./images/owner.png"}, 
	GENERAL: {icon:'general-icon', txt:'', img:''}
} 

const imgType = {IMG:"img", GIF:"gif"}; 

const faveImg={
	0:"./images/star.svg",
	1:"./images/green_star.svg"}

// holds location
class Group {
	constructor(group_name,handle, g_img){
		this.handle = handle;
		this.g_img = g_img; 
		this.state = "";
		this.city = "";
		this.country = "";
		this.descr = "";
		this.group_name =group_name

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
		this.events = [];

	}

	setMember(mem){
		if (!(mem in member)){
			throw new Error("member_type, setOwner(): Not a valid group member type");
		}
		this.mem = 	mem; 
	}

	addEvent(event){
		this.events.push(event); 
	}

}



/******************************* Initialize things for the Group Cards ***********************/
clubList = []
function initGroupCards(){
	let club_handles = ["cs_Faculty_nu", "devClub_nu", "cookology_nu", "_64Squares_nu", "GLAC_nu", "AEPI_nu", "kelloggPhdSoccer_nu",
					"freeDaBelly_nu", "asa_nu", "bBurlesque_nu", "cs343_studygrouup9", "cheesClub_nu", "boogo_party"]

	let club_names = ["CS Faculty", ".dev Club", "Cookology", "64 Squares", "GLAC", "AEPI", "Pickup Soccer",
					"Free Belly", "ASA", "b Burlesque", "cs343_studygrouup9", "cheese Club", "Boogo"]


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
		let group = new Group(club_names[i], club_handles[i], club_images[i] );
		group.setLocation("IL","Evanston","USA");
		group.setDescr(club_descr[i]);
		console.log(group.group_name);
		console.log(group.handle);
		//set up the rest of the info
		let club = new ClubMember(memberOptions[getRandomAccess()],group);
		//append to vector. 
		clubList.push(club);

	}
}

/********************************* Initialzie some events ****************************/

function initSampleEvents(){

	//Generate Random # of events that the groups are having
	var number_of_events = [];

	for (let i=0; i<clubList.length; i++){
		number_of_events.push(getRandomInt(3)); 
		}; 

	let imgPath = "./images/event_images/" 

	/*Example events where img is used*/
	eventTime_dev1 = new EventTime("May",18, 2019, "Sat", "10am", "5pm") 
	eventTime_dev2 = new EventTime("May",17, 2019, "Fri","6pm", "8pm")
	eventTime_aepi1 = new EventTime("Jun.",17, 2019, "Mon.", "6pm", "8pm") //networking w/ AEPI
	eventTime_cook1 = new EventTime("Jun.",4, 2019, "Sat","7pm", "8pm") //Fried Chicken w/ Cookology
	eventTime_cs1 = new EventTime("Jun.",16, 2019, "Thu","5pm", "6pm") // CS Faculty seminar
	eventTime_glac = new EventTime("Jun.",16, 2019, "Thu", "5pm", "6pm") // GLAC Diversity Coffee & Donuts
	eventTime_asa1 = new EventTime("May",27, 2019, "Mon", "1pm", "3pm") // ASA BBq
	eventTime_phd1 = new EventTime("May",23, 2019, "Mon", "5pm", "7pm") // Phd: World Cup
	eventTime_asa2 = new EventTime("Jun.",15, 2019, "Sat", "1:30pm") // ASA: Yaht Part, no end time
	eventTime_glac2 = new EventTime("Jun.",5, 2019, "Wed", "4:30pm", "6:30pm") // GLAC: Workshop: Inventing Your Life
	eventTime_64sq = new EventTime("Jun.",13, 2019, "Thu", "11:30am", "6:30pm") // Spring Chess Tourney
	eventTime_glac3 = new EventTime("Jun.",7, 2019, "Fri", "12pm", "1pm") // Workshop: Fellowship and Grant Writing 
	eventTime_glac4 = new EventTime("Jun.",6, 2019, "Thu", "6pm", "8pm") // happy hour

	eventLoc_dev1 = new EventLocation("2145 Sheridan Rd", "Evanston", "IL", "Tech L251") 
	eventLoc_dev2 = new EventLocation("2133 Sheridan Rd", "Evanston", "IL", "Ford ITW")
	eventLoc_aepi1 = new EventLocation("24 S Michigan Ave", "Chicago", "IL", "The Gage") //networking w/ AEPI
	eventLoc_cook1 = new EventLocation("2132 Noyes Rd", "Evanston", "IL", "Robbie's Apt") //Fried Chicken w/ Cookology
	eventLoc_cs1 = new EventLocation("2311 N. Campus Drive, Suite 1400", "Evanston", "IL", "The Garage") // CS Faculty seminar
	eventLoc_glac = new EventLocation("1999 Campus Dr", "Evanston", "IL", "Norris Center, 3rd Flr") // GLAC Diversity Coffee & Donuts
	eventLoc_asa1 = new EventLocation("70 Arts Cir Dr", "Evanston", "IL", "The Lakefill") // ASA BBq
	eventLoc_phd1 = new EventLocation("1937 Sheridan Rd", "Evanston", "IL", "Deering Meadow")// Phd: World Cup
	eventLoc_asa2 = new EventLocation("200 N Breakwater Access", "Chicago", "IL", "Navy Pier") // ASA: Yaht Part, no end Loc
	eventLoc_glac2 = new EventLocation("1999 Campus Dr", "Evanston", "IL", "Norris, Louis Room") // GLAC: Workshop: Inventing Your Life
	eventLoc_64sq = new EventLocation("2132 Noyes Rd", "Evanston", "IL", "Tim's crib") // Spring Chess Tourney
	eventLoc_glac3 = new EventLocation("2145 Sheridan Rd", "Evanston", "IL", "Tech L150")// Workshop: Fellowship and Grant Writing 
	eventLoc_glac4 = new EventLocation("1635 Chicago Avenue ", "Evanston", "IL", "Prairie Moon Evanston") // happy hour
   
	eventMeta_dev1 = new EventMetaData("Skyrocket Design-A-Thon", imgPath+"design-a-thon.jpeg", imgType.IMG, getRandomInt(50)) 
	eventMeta_dev2 = new EventMetaData(".Develop Project Showcase", imgPath+"devShowcase.png", imgType.IMG, getRandomInt(50)) 
	eventMeta_aepi1 = new EventMetaData("AE&pi; Alumni Networking", imgPath+"networking.jpeg", imgType.IMG, getRandomInt(150))  //networking w/ AEPI
	eventMeta_cook1 = new EventMetaData("Gourmet Fried Chicken Class", imgPath+"friedChicken.jpg", imgType.IMG, getRandomInt(30))  //Fried Chicken w/ Cookology
	eventMeta_cs1 = new EventMetaData("Seminar: Machine Learning", imgPath+"seminar.png", imgType.IMG, getRandomInt(50))  // CS Faculty seminar
	eventMeta_glac = new EventMetaData("GLAC Diversity Coffee & Donuts", imgPath+"donuts.jpeg", imgType.IMG, getRandomInt(80))  // GLAC Diversity Coffee & Donuts
	eventMeta_asa1 = new EventMetaData("NSBE Memorial Day BBQ", imgPath+"nsbbq.png", imgType.IMG, getRandomInt(100))  // ASA BBq
	eventMeta_phd1 = new EventMetaData("NU World Cup: Cultural Event", imgPath+"worldCup.png", imgType.IMG, getRandomInt(80)) // Phd: World Cup
	eventMeta_asa2 = new EventMetaData("Paradice on a Yacht", imgPath+"nsbe_yaht.JPG", imgType.IMG, getRandomInt(150))  // ASA: Yaht Part, no end Loc
	eventMeta_glac2 = new EventMetaData("Workshop: Inventing Your Life", imgPath+"invention.jpg", imgType.IMG, getRandomInt(60))  // GLAC: Workshop: Inventing Your Life
	eventMeta_64sq = new EventMetaData("Spring Chess Tourney", imgPath+"chess_game.jpeg", imgType.IMG, getRandomInt(35))  // Spring Chess Tourney
	eventMeta_glac3 = new EventMetaData("Fellowship/Grant Workshop", imgPath+"fellowship.png", imgType.IMG, getRandomInt(35)) // Workshop: Fellowship and Grant Writing 
	eventMeta_glac4 = new EventMetaData("MGLC Spring Happy Hour", imgPath+"mglc_happyhr.jpg", imgType.IMG, getRandomInt(100)) // happy hour


	/*Example events where gif is used*/
	eventTime_cs2 = new EventTime("Jun.",29, 2019, "Sat", "8pm", "12am") // CS Faculty Social 
	eventTime_cook2 = new EventTime("Jun.",3, 2019, "Mon", "6pm", "7pm") // Cookology: Baking Basics
	eventTime_aepi2 = new EventTime("Jun.",1, 2019, "Sat", "10pm", "2am") // AEPI: Zeebras, Zees, and Zues
	eventTime_cheese1 = new EventTime("Jun.",2, 2019, "Sun", "12pm", "2pm") // Cheese Club Study Table
	eventTime_asa3 = new EventTime("Jun.",5, 2019, "Wed", "7pm", "10pm") // ASA Study Table
	eventTime_OS1 = new EventTime("Jun.",8, 2019, "Sat", "3pm", "6pm") // CS343: Final Review
	eventTime_boogo = new EventTime("Jun.",8, 2019, "Sat", "11pm", "5am") // End of Year Banger
	eventTime_phd2 = new EventTime("Jun.",8, 2019, "Fri", "4pm", "7pm") // PIckup Soccer
	eventTime_glac5 = new EventTime("Jun.",8, 2019, "Fri", "3pm", "6pm") // End of Year: Ice Cream Social Soccer

	eventLoc_cs2 = new EventLocation("1615 Chicago Ave", "Evanston", "IL", "Tapas Barcelona") // CS Faculty Social 
	eventLoc_cook2 = new EventLocation("2110 Sheridan Rd", "Evanston", "IL", "Sheil Catholic Center") // Cookology: Baking Basics
	eventLoc_aepi2 = new EventLocation("584 Lincoln St", "Evanston", "IL", "AE&pi;") // AEPI: Zeebras, Zees, and Zues
	eventLoc_cheese1 = new EventLocation("2145 Sheridan Rd", "Evanston", "IL", "Tech L241") // Cheese Club Study Table
	eventLoc_asa3 = new EventLocation("2145 Sheridan Rd", "Evanston", "IL", "Tech L261")// ASA Study Table
	eventLoc_OS1 = new EventLocation("2233 Sheridan Rd", "Evanston", "IL", "Mudd 2133") // CS343: Final Review
	eventLoc_boogo = new EventLocation("3424 Noyes St", "Evanston", "IL", "Boogo House") // End of Year Banger
	eventLoc_phd2 = new EventLocation("2235 Campus Drive", "Evanston", "IL", "Lakeside Fields") // PIckup Soccer
	eventLoc_glac5 = new EventLocation("2233 Tech Dr", "Evanston", "IL", "Mudd East (Collaboration Hub)") // End of Year: Ice Cream Social Soccer

	eventMeta_cs2 = new EventMetaData("CS Faculty End-of-Year Social", imgPath+"dancing_80s.gif", imgType.GIF, getRandomInt(100)) // CS Faculty Social 
	eventMeta_cook2 = new EventMetaData("Baking Basic Lessons", imgPath+"brownie.gif", imgType.GIF, getRandomInt(50)) // Cookology: Baking Basics
	eventMeta_aepi2 = new EventMetaData("Zeebras, Zeez, and Zues", imgPath+"zebra.gif", imgType.GIF, getRandomInt(300)) // AEPI: Zeebras, Zees, and Zues
	eventMeta_cheese1 = new EventMetaData("Cheese Club Study Table", imgPath+"spongebob.gif", imgType.GIF, getRandomInt(30)) // Cheese Club Study Table
	eventMeta_asa3 = new EventMetaData("ASA Study Table", imgPath+"rapper.gif", imgType.GIF, getRandomInt(30))// ASA Study Table
	eventMeta_OS1 = new EventMetaData("CS343: Final Review", imgPath+"cat.gif", imgType.GIF, getRandomInt(20)) // CS343: Final Review
	eventMeta_boogo = new EventMetaData("Boogo: End of Year Banger", imgPath+"vibes.gif", imgType.GIF, getRandomInt(500)) // End of Year Banger
	eventMeta_phd2 = new EventMetaData("Pickup football", imgPath+"soccerAnimal.gif", imgType.GIF, getRandomInt(30)) // PIckup Soccer
	eventMeta_glac5 = new EventMetaData("Spring Ice Cream Social", imgPath+"ice_cream.gif", imgType.GIF, getRandomInt(100)) // End of Year: Ice Cream Social Soccer
	


	eventImgTime= [eventTime_dev1,eventTime_dev2,eventTime_aepi1,eventTime_cook1,eventTime_cs1,
						eventTime_glac, eventTime_asa1, eventTime_phd1,eventTime_asa2,eventTime_glac2,
						eventTime_64sq, eventTime_glac3, eventTime_glac4 ]; 

	eventImgLoc =[eventLoc_dev1,eventLoc_dev2,eventLoc_aepi1,eventLoc_cook1,eventLoc_cs1,
						eventLoc_glac, eventLoc_asa1, eventLoc_phd1,eventLoc_asa2,eventLoc_glac2,
						eventLoc_64sq, eventLoc_glac3, eventLoc_glac4 ]; 


	eventImgMeta = [eventMeta_dev1,eventMeta_dev2,eventMeta_aepi1,eventMeta_cook1,eventMeta_cs1,
						eventMeta_glac, eventMeta_asa1, eventMeta_phd1,eventMeta_asa2,eventMeta_glac2,
						eventMeta_64sq, eventMeta_glac3, eventMeta_glac4 ];

	eventImg_GroupHandles = ["devClub_nu", "devClub_nu", "AEPI_nu", "cookology_nu", "cs_Faculty_nu", "GLAC_nu",
							"asa_nu", "kelloggPhdSoccer_nu", "asa_nu", "GLAC_nu", "_64Squares_nu","GLAC_nu","GLAC_nu"];


	eventGifTime = [eventTime_cs2,eventTime_cook2,eventTime_aepi2,eventTime_cheese1, 
	                 eventTime_asa3, eventTime_OS1,eventTime_boogo,eventTime_phd2,eventTime_glac5 ];

	eventGifLoc = [eventLoc_cs2,eventLoc_cook2,eventLoc_aepi2,eventLoc_cheese1, 
	                 eventLoc_asa3, eventLoc_OS1,eventLoc_boogo,eventLoc_phd2,eventLoc_glac5 ];

	eventGifMeta = [eventMeta_cs2,eventMeta_cook2,eventMeta_aepi2,eventMeta_cheese1, 
	                 eventMeta_asa3, eventMeta_OS1,eventMeta_boogo,eventMeta_phd2,eventMeta_glac5 ];

	eventGif_GroupHandles = ["cs_Faculty_nu", "cookology_nu", "AEPI_nu", "cheesClub_nu","asa_nu", "cs343_studygruup9", "boogo_party", "kelloggPhdSoccer_nu",  "GLAC_nu"];


	/*Function that adds the correct event to the correct group*/
	var addEvent = function(eventTimes, eventsLocs, eventMetas, eventHandles)
					{
						let event, saved; 
						for (let i=0; i< eventHandles.length; i++){
							saved =getRandomInt(2);
							event = new Event(eventsLocs[i],eventTimes[i], eventMetas[i],saved,!(saved) ); 
							for (let club of clubList){
								if (club.group.handle == eventHandles[i]){
									club.addEvent(event); 
									break; 
								}
							}
						}
					}; 

	addEvent(eventImgTime,eventImgLoc,eventImgMeta,eventImg_GroupHandles ); 
	addEvent(eventGifTime,eventGifLoc,eventGifMeta,eventGif_GroupHandles ); 
}
/************** Format Function: Event Card **************************/

function FormatEventCard(id, mem_Type, club_name, club_handle, club_img, loc,time, metaData){
	let managerClass, event_name, datetime = '', location_name,location, rsvps,picture;

	if (mem_Type == member.GENERAL){
		managerClass = "share-event-blank"; 
	}else{
		managerClass = "share-event"; 

	}

	if (metaData.event_imgType == imgType.IMG){
		picture = `<img src="${metaData.event_img}" style="width:100%;height:100%">`
	}else{
		picture = `<img data-gifffer="${metaData.event_img}" data-gifffer-height="100%" data-gifffer-width="100%" data-gifffer-duration="1000"/>`
	}

	event_name = metaData.event_name; 
	datetime = getDate(time);
	location_name = loc.loc_name; 
	location = loc.street+" &#183; "+loc.city+" &#183; "+loc.state; 
	rsvps =metaData.rsvps+" people rsvp'd to this event"; 
	club_handle = "@"+club_handle

	let formatt= `<div class="event-card" id=${id}>
		<div class="img-container">
			<div class="event-image"> 
				${picture}
			</div>
		</div>

		<!-- Event details such as time, date, people going --> 
		<div class="event-details" style="display: inline-block;">
			<div class="event-txt-details" style="float:left;clear:left;">
				<h4 class="event-title">${event_name}</h4><br/>
				<p class="event-date" >${datetime}</p>
				<section class="event-loc" >
					<p class="event-loc-title" style="margin:0;padding:0;">
						${location_name}
					<p/>
					<p class="event-loc-addr"  style="margin:0;padding:0;">
						${location}
					</p>
					<p class="event-rsvps" >
						${rsvps}
					</p>
				</section> 
			</div>

			<!-- Share and manage button -->
			<div class="event-card-buttons">
				<div class="share-event"  style="display: inline-block;"> 
					<div class="share-icon">
						<ion-icon name="share-alt" ></ion-icon>
					</div>
					<div class="share-txt" style="margin-left:3.2vw;"> Share </div>
				</div>
				<div class="${managerClass}"  style="display: inline-block;margin-right:0;"> 
					<div class="share-icon">
						<ion-icon name="create"></ion-icon>
					</div>
					<div class="share-txt"> Manage </div>
				</div>
			</div>

			<!-- The vertical line seperating sections-->
			<div class="vertical-line"></div>

			<!-- Event host Information -->
			<div class="event-host" style="float: right;">
				<div class="vertical-seperator" style="display: inline-block;" >
					<span> hosted by: </span>
					<section class="eventhost-info" >
						<h5 class="eventhost-name" style="margin:0;padding:0;">${club_name}</h5>
						<div class="space"></div>
						<p class="eventhost-handle" style="margin:0;padding:0;"> 
							${club_handle} 
						</p>
					</section>
				</div>
				<div class ="profile-pic-event">
				<img src = "${club_img}">
			</div>
			</div>
		</div>
	</div>`

	return formatt;
}

function getFormatEventCard(club, rsvp=false, saved = false){
	let club_name = club.group.group_name; 
	let club_handle = club.group.handle;
	let club_img = club.group.g_img;
	let mem_Type = club.mem; 
	let formatt = "";

	/* Gets properly formatted eventDate*/
	getDate=function(time){
		let datasound; 
		if (time.day == 1){
			datasound = "st";
		}else if (time.day ==2){
			datasound = "nd";
		}else if (time.day ==3){
			datasound = "rd";
		}else{
			datasound = "th";
		}

		let eventDate=''; 
		eventDate += time.dayOfWeek+"., "+time.month+" "+time.day+datasound+" from "
		if (time.endTime ==''){
			eventDate +=time.startTime; 
		}else{
			eventDate +=time.startTime+" - "+time.endTime; 
		}
		return eventDate; 
	}



	/*Loop through events and format them properly*/
	let loc, time, metaData, idx=0, id, idholder=[]; 
	for (let evnt of club.events){
		if ((rsvp && evnt.is_rsvp && (mem_Type==member.GENERAL)) || 
			(saved && evnt.is_saved && (mem_Type==member.GENERAL)) || 
			(!rsvp && !saved)){
					loc = evnt.loc; 
					time =  evnt.time; 
					metaData = evnt.metaData; 
					id = club_handle+toString(idx); 
					formatt+=FormatEventCard(id, mem_Type, club_name, club_handle, club_img,  loc,time, metaData); 
					++idx; 
					idholder.push(id); 
			}
	}

	return {STR:formatt, IDs:idholder}; 
}




/******************************** Format Function: Group Card**********************************/
function getFormatGroupCard(club){
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
/************ Reactive Functions for Event Cards*************/
activehandles_events =[];

function rm_handles_events(){
	for (var a in activehandles_events){
		let id = document.getElementById(a)
		if (id !=null){
			id.outerHTML = "";
		}
	}
}

function all_events(){
	let active = [];
	let formatt = "";

	for (let i = 0; i<clubList.length; i++){
		rtrn_val = getFormatEventCard(clubList[i]);
		formatt+=rtrn_val.STR; 
		active = active.concat(rtrn_val.IDs)
	}
	/*remove old handles*/
	rm_handles_events();

	/*Add new shit*/
	var groupblock = document.getElementById("block-card");
	if (formatt==""){
		groupblock.innerHTML = noCards('No Events');
	}else{
		groupblock.innerHTML = formatt;
	}
	return active; 
}


function hosted_events(){
	let active = [];
	let formatt = "";

	for (let i = 0; i<clubList.length; i++){
		if (!(member.GENERAL == clubList[i].mem)){
			rtrn_val = getFormatEventCard(clubList[i]);
			formatt+=rtrn_val.STR; 
			active = active.concat(rtrn_val.IDs);
		}
	}
	/*remove old handles*/
	rm_handles_events();

	/*Add new shit*/
	var groupblock = document.getElementById("block-card");
	if (formatt==""){
		groupblock.innerHTML = noCards('No Hosted Events');
	}else{
		groupblock.innerHTML = formatt;
	}
	return active; 
}


function rsvp_events(){
	let active = [];
	let formatt = "";

	for (let i = 0; i<clubList.length; i++){
			rtrn_val = getFormatEventCard(clubList[i], rsvp=true, saved = false);
			formatt+=rtrn_val.STR; 
			active = active.concat(rtrn_val.IDs);
	}

	/*remove old handles*/
	rm_handles_events();

	/*Add new shit*/
	var groupblock = document.getElementById("block-card");
	if (formatt==""){
		groupblock.innerHTML = noCards("No RSVP'd Events");
	}else{
		groupblock.innerHTML = formatt;
	}
	return active; 
}

function saved_events(){
	let active = [];
	let formatt = "";

	for (let i = 0; i<clubList.length; i++){
		rtrn_val = getFormatEventCard(clubList[i],rsvp=false, saved = true);
		formatt+=rtrn_val.STR; 
		active = active.concat(rtrn_val.IDs)
	}
	/*remove old handles*/
	rm_handles_events();

	/*Add new shit*/
	var groupblock = document.getElementById("block-card");
	if (formatt==""){
		groupblock.innerHTML = noCards('No Saved Events');
	}else{
		groupblock.innerHTML = formatt;
	}
	return active; 
}



/*********** Wrapper for the event card  react Functions ***************/

/*Set up the default value for groups selected when user first opens page*/
function default_events(){
	let active = [];
	let formatt = "";	
	for (let i = 0; i<clubList.length; i++){
		if (!(member.GENERAL == clubList[i].mem)){
			rtrn_val = getFormatEventCard(clubList[i]);
			formatt+=rtrn_val.STR; 
			active = active.concat(rtrn_val.IDs);
		}
	}
	activehandles_events = active; 
}


/*********** Reactive Functions for Groups***************/
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
		formatt+=getFormatGroupCard(clubList[i]);
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
			formatt+=getFormatGroupCard(clubList[i]);
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
			formatt+=getFormatGroupCard(clubList[i]);
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
			formatt+=getFormatGroupCard(clubList[i]);
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

/*Set up the default value for groups selected when user first opens page*/
function default_groups(){
	let active = [];
	let formatt = "";	
	for (let i = 0; i<clubList.length; i++){
		memType = clubList[i].mem;
		if (memType==member.ADMIN || memType==member.OWNER){
			active.push(clubList[i].group.handle);
			formatt+=getFormatGroupCard(clubList[i]);
		}

	}
	activehandles = active; 
}


/****************These Funtions are to underline the categories for group/events**********************/
function getGroupsEvents(geType){
	switch(geType){
		case "all_groups":
			activehandles = all_groups(); 
			break;
		case "owner_admin":
			activehandles = owner_admin(); 
			break;
		case "favorites":
			activehandles = favorites(); 
			break;
		case "following":
			activehandles = following(); 
			break; 
		case "all_events":
			activehandles_events = all_events(); 
			break;
		case "hosting":
			activehandles_events = hosted_events(); 
			break;
		case "rsvp":
			activehandles_events = rsvp_events(); 
			break;
		default:
			activehandles_events = saved_events(); 			
	}
}


group_categories =["all_groups", "owner_admin",  "following", "favorites"]
event_categories =["all_events", "hosting", "rsvp", "saved"]
curr_group_category = null; 
curr_event_category = null; 
is_favoritesOn = false;

function setCategory(cat){
	var curr_group = document.getElementById(cat);

	if (curr_group !=null){
		curr_group.style["border-bottom"]= "2px solid"; 
		curr_group.style["border-bottom-color"]= "rgba(0, 100, 0,1)"; 


		is_favoritesOn = (cat == "favorites"); /*case in which we are in the favorite group*/
		if  (group_categories.includes(cat)){
			var past_group=document.getElementById(curr_group_category);
			curr_group_category = cat;
			/*Change elements selected*/
			getGroupsEvents(cat);

		}
		else{
			var past_group=document.getElementById(curr_event_category);
			curr_event_category=cat;
			getGroupsEvents(cat);
		}
		past_group.style["border-bottom-color"]= "rgb(255,255,255)"; 
		past_group.style["border-bottom"]= "0px"; 
	}
}

function initCategories(){
	//set init category for groups to owner+admin
	var curr_group = document.getElementById("owner_admin");
	curr_group.style["border-bottom"]= "2px solid"; 
	curr_group.style["border-bottom-color"]= "rgba(0, 100, 0,1)"; 
	curr_group_category = "owner_admin"; 
	//set init category for events to hosting
	var curr_group = document.getElementById("hosting");
	curr_group.style["border-bottom"]= "2px solid"; 
	curr_group.style["border-bottom-color"]= "rgba(0, 100, 0,1)";  
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






