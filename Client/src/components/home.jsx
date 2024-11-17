import Footer from "../shared/footer";
import NavBar from "../shared/navBar/navBar"
import BookManagement from "./admin/BookManagement";
import HeroSection from "./heroSection";

const Home=()=>{
    let role="user",fullname="";
    function checLocalStorage() {
        const session = localStorage.getItem("session");

        if (session) {
            fullname = JSON.parse(session).name;
            role = JSON.parse(session).role;
        }
    }
    checLocalStorage();

    return (

        <>  
        
            <NavBar/>

            {
                (role==="user")?
                    <HeroSection/>
                :
                    <BookManagement/>
            }



            <Footer/>
        </>

    )

}


export default Home;