const app = new Vue({
  el: "#app",
  created: function () {
    this.getImage()
  },
  data:{
    loginData:{
      email:'',
      password: '',
      token: ''
    },
    image: null,
    download: '',
    imageDetail: {
      name: '',
      description: ''
    },
    formdata: new FormData(),
    pictures: [],
    registerData: {
      nama: '',
      email: '',
      password: ''
    }
  },
  methods: {
    logout(){
      localStorage.removeItem("token");
      window.location = '/login.html'
    register: function (event) {
      event.preventDefault();
      axios.post('http://localhost:3000/register', this.registerData)
      .then((response) => {
        swal({
          title: "Yosh!",
          text: "Successfully registered!",
          icon: "success",
        });
          this.registerData.nama= '';
          this.registerData.email= '';
          this.registerData.password= '';
        })
      .catch((error) => {
        console.log(error);
      });

    },
    login: function (event) {
      event.preventDefault()
      axios.post('http://localhost:3000/login', this.loginData)
      .then(data => {
        localStorage.setItem('token', data.data)
        window.location.href = 'userpage.html'
      })
      .catch(err => {
        console.log(err);
      })
    },
    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload() {
      // upload file

      var token = localStorage.getItem('token');
      var email = localStorage.getItem('email');

      this.formdata.set('item', this.image)
      this.formdata.set('description', this.imageDetail.description)
      this.formdata.set('picture_name', this.imageDetail.name)
      this.formdata.set('token', token)
      this.formdata.set('email', email)

      axios.post('http://localhost:9000/image', this.formdata)
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
    getImage(){
      axios.get('http://localhost:9000/')
      .then(({data})=>{
        this.pictures = data.data
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
})
