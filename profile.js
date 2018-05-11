const profile = new Vue({
    el: "#profile",
    data:{
        Pictures: []
    },
    created: function () {
        console.log('Created');
        this.getImageById('12345');
    },
    methods:{ 
        getImageById(userId){
            axios.get(`http://localhost:9000/pictures/${userId}`)
                .then(({data})=>{
                    this.Pictures = data;
                })
                .catch(err => {
                    return err
            })
        },
        addLikes(userId, index){
            axios.put(`http://localhost:9000/pictures/${userId}`)
            .then(({data})=>{
                this.Pictures[index].likes += 1;
            })
            .catch(err=>{
                return err
            })
        }
    }
  })
  