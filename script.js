const app = new Vue({
  el: "#app",
  created: function () {
    this.getImage()
  },
  data:{
    image: null,
    formdata: new FormData(),
    pictures: []
  },
  methods: {
    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload() {
      // upload file
      this.formdata.set('item', this.image)

      axios.post('http://localhost:3000/image', this.formdata)
      .then(response => {
        this.getImage()
        console.log('');
      })
      .catch(err => {
        console.log(err);
      })

    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (event) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    getImage(){
      axios.get('http://localhost:3000/')
      .then(({data})=>{
        this.pictures = data.data
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
})
