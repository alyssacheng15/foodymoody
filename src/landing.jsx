import React from "react";
   import {Link} from "react-router-dom";

    function Landing() {

        return (
          <div>
            <p>
              This is the first page.
              <br />
              Click on the button below.
            </p>
            <Link to='./App'><button>
              Go to Page 2 
            </button>
            </Link>
          </div>
        );

    }

    export default Landing;