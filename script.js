const app = new Vue({
  el: "#app",
  created: function () {
    this.getImage()
  },
  data:{
    image: null,
    download: '',
    imageDetail: {
      name: '',
      description: ''
    },
    formdata: new FormData(),
    pictures: []
  },
  methods: {
    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload() {
      // upload file

      var token = localStorage.getItem('token');

      this.formdata.set('item', this.image)
      this.formdata.set('description', this.imageDetail.description)
      this.formdata.set('picture_name', this.imageDetail.name)
      this.formdata.set('token', token)

      axios.post('http://localhost:3000/image', this.formdata)
      .then(response => {
        swal({
          title: "Yosh!",
          text: "Successfully save image!",
          icon: "success",
        });

        this.imageDetail.name = ''
        this.imageDetail.description = ''
        this.imageDetail.category = ''

        this.getImage()
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
