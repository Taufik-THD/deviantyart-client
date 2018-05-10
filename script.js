const app = new Vue({
  el: "#app",
  data:{
    image: null,
    formdata: new FormData()
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
        console.log('');
      })
      .catch(err => {
        console.log(err);
      })

    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (event) => {
        vm.image = event.target.result;
      };
      reader.readAsDataURL(file);
    },
  }
})
