const profile = new Vue({
    el: "#profile",
    data:{
      Pictures: []
    },
    created: function () {
        console.log('Created');
        this.getImages();
    },
    methods:{
        getImageById(userId){
            axios.get(`http://localhost:3000/pictures/${userId}`)
                .then(({data})=>{
                    this.Pictures = data;
                })
                .catch(err => {
                    return err
            })
        },
        addLikes(userId, index){
            axios.put(`http://localhost:3000/pictures/${userId}`)
            .then(({data})=>{
                this.Pictures[index].likes += 1;
            })
            .catch(err=>{
                return err
            })
        },
        getImages(){
          axios.post(`http://localhost:3000/user/images`,{token:localStorage.token})
          .then(images=>{
            this.Pictures=images.data.images
            console.log(images.data.images);
          })
          .catch(err=>{
            return err
          })
        }
    }
  })
