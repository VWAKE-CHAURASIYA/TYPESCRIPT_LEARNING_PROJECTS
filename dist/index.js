//! HERE I NEED TO WRITE A CODE IN TYPESCRIPT, TO FETCH THE GITHUB API , AND DISPLAY IT TO A WEBPAGE, ALONG WITH SERACHING FUNCTIONALITY: 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//? FIRST TAKING THE REFERNCE OF INPUT BOX, SEARCH BOTTON, AND THE DISPLAY AREA WHERE WE WANT TO DISPALY THE CARDS: 
let inputBox = document.querySelector("#searchItems");
let formSubmit = document.querySelector("#form");
let displayItem = document.querySelector(".display-Items");
//? DEFINING THE CUSTOM FUNCTIONS: 
function myCustomFetcher(url, option) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            //IF THERE ANY ERROR IN API: 
            throw new Error(`Network Response was not ok - status ${response.status}`);
        }
        //IF NO ANY ERROR , NOW SHOWING THE COMPLETE DATA OF API:
        let data = yield response.json();
        console.log(data);
        return data; //ONCE RETURNING THE DATA THER ERROR THAT SHOWN IN THE PROMISES IS GONE
    });
}
//? NOW CREATING A FUNCTION, TO SHOW UI.
const showUserUI = (singleUser) => {
    displayItem.insertAdjacentHTML("beforeend", `<div class='card'>
    <img src= "${singleUser.avatar_url}" alt="${singleUser.login}" />
    <hr/>
    <div class="card-footer">
    <img src= "${singleUser.avatar_url}" alt="${singleUser.login}"/>
     <a href= "${singleUser.url}">Github</a>
    </div>
    </div> `);
};
//? CREATING A FUNCTION THAT TAKES THE API AS STRING TYPES: 
const fetchUserData = (url) => {
    //HERE CREATING ANOTHER REUSABLE FUNCTION, THAT FETECHS THE API.
    myCustomFetcher(url, {}).then((userData) => {
        for (const singleUser of userData) {
            //CALLING THE FUNCTION TO DISLAY THE UI: 
            showUserUI(singleUser);
            console.log("login" + singleUser.login); //here we get all interce value
        }
    });
};
//? FUNCTION CALL ON PAGE LOAD...(DEFAULT FUNCITON CALL..)
fetchUserData("https://api.github.com/users");
//! NOW PERFORM SEARCHING: 
formSubmit.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); //prevent form from automatic submission.
    let searchItem = inputBox.value.toLowerCase();
    try {
        let url = "https://api.github.com/users";
        let allUserData = yield myCustomFetcher(url, {}); //! HERE WE MUST HAVE TO DEFINE TYPE , OTHERWISE GOT AN ERROR...
        let matchingUser = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchItem);
        });
        //NOW WRITING THE CODE AGAIN, TO SHOW ONLY MATHCING DATA TO THE WEBPAGE: 
        displayItem.innerHTML = "";
        if (matchingUser.length === 0) {
            displayItem.insertAdjacentHTML("beforebegin", "<p class='no-matching'>No matching Users Found...</p>");
        }
        else {
            //SHOWING ALL DATA ACCORDING TO MATCHIGN ITEMS:
            for (const singleUser of matchingUser) {
                showUserUI(singleUser); //GET THE DATA AS PER SEARCHING...
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
export {};
//# sourceMappingURL=index.js.map