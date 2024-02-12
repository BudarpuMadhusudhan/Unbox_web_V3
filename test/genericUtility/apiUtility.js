const axios=require('axios').default;

class APIUtility {
  async  getData() {
        axios.get("https://api.github.com/users/Swaraj-N/repos")
            .then(function (res) {
                console.log((res.data[1].name));
                console.log(((res.status)));
            })
            .catch(function (err) {
                console.log(err.statusText);
            })
    }
}
module.exports = new APIUtility()