//! HERE I NEED TO WRITE A CODE IN TYPESCRIPT, TO FETCH THE GITHUB API , AND DISPLAY IT TO A WEBPAGE, ALONG WITH SERACHING FUNCTIONALITY: 

//? FIRST TAKING THE REFERNCE OF INPUT BOX, SEARCH BOTTON, AND THE DISPLAY AREA WHERE WE WANT TO DISPALY THE CARDS: 

let inputBox = document.querySelector("#searchItems") as HTMLInputElement;
let formSubmit=document.querySelector("#form")as HTMLFormElement;
let displayItem = document.querySelector(".display-Items") as HTMLElement;

//? ONCE TAKING THE REFERENCE, NOW CREATING A RESUABLE FUNCITON, TO CALL AND DISPLAY THE CODE BY FETCHING THE API: 

//FIRST I NEED TO DEFINE THE CONTRACT FOR AN CARD OBJECTS, WHICH IS CALLED AS INTERFACE: 

interface UserData{
 id: number;
 login: string;
 avatar_url: string;
 location: string;
 url: string; 
}

//? DEFINING THE CUSTOM FUNCTIONS: 
async function myCustomFetcher<T>(url:string, option?:RequestInit):Promise<T> {
    const response = await fetch(url);

    if(!response.ok)
    {
        //IF THERE ANY ERROR IN API: 
        throw new Error(
            `Network Response was not ok - status ${response.status}`
        )
    }
    
    //IF NO ANY ERROR , NOW SHOWING THE COMPLETE DATA OF API:
    let data =await response.json();  
    console.log(data); 
    return data;    //ONCE RETURNING THE DATA THER ERROR THAT SHOWN IN THE PROMISES IS GONE
}


//? NOW CREATING A FUNCTION, TO SHOW UI.
const showUserUI =(singleUser:UserData) =>{
displayItem.insertAdjacentHTML(
    "beforeend",
    `<div class= 'card'>
    <img src= "${singleUser.avatar_url}" alt="${singleUser.login}" />
    <hr/>
    <div class="card-footer">
    <img src= "${singleUser.avatar_url}" alt="${singleUser.login}"/>
     <a href= "${singleUser.url}">Github</a>
    </div>
    </div> `
)
}


//? CREATING A FUNCTION THAT TAKES THE API AS STRING TYPES: 
const fetchUserData = (url: string)=>
{
    //HERE CREATING ANOTHER REUSABLE FUNCTION, THAT FETECHS THE API.
    myCustomFetcher<UserData[]>(url, {}).then((userData)=>{
        for(const singleUser of  userData)
        {
            //CALLING THE FUNCTION TO DISLAY THE UI: 
            showUserUI(singleUser);
            console.log("login" + singleUser.login); //here we get all interce value
        }
    })
}


//! NOW PERFORM SEARCHING: 
formSubmit.addEventListener('submit', async(event)=>
{
    event.preventDefault();  //prevent form from automatic submission.

    let searchItem = inputBox.value.toLowerCase();

    
    try {
     let url = "https://api.github.com/users";
 
     let allUserData = await myCustomFetcher<UserData[]>(url, {}); //! HERE WE MUST HAVE TO DEFINE TYPE , OTHERWISE GOT AN ERROR...

     let matchingUser = allUserData.filter((user )=>{
        return user.login.toLowerCase().includes(searchItem);
     })

     //NOW WRITING THE CODE AGAIN, TO SHOW ONLY MATHCING DATA TO THE WEBPAGE: 
     displayItem.innerHTML = "";

     if(matchingUser.length === 0)
     {
        displayItem.insertAdjacentHTML("beforebegin", 
            "<p class='no-matching'>No matching Users Found...</p>"
        )
     }
     else{
        //SHOWING ALL DATA ACCORDING TO MATCHIGN ITEMS:
        for(const singleUser of matchingUser)
        {
            showUserUI(singleUser);  //GET THE DATA AS PER SEARCHING...
        }
     }
    
 } catch (error) {
    console.log(error)
 }


})


//? FUNCTION CALL ON PAGE LOAD...(DEFAULT FUNCITON CALL..)
fetchUserData("https://api.github.com/users")
