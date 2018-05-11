Vue.component('images', {
    // camelCase in JavaScript
    props: ['gambar', 'index'],
    template: `
    <div class="column">
      <div class="">
        <div class="ui card">
          <div class="image">
            <img v-bind:src=gambar.pic_url>
          </div>
          <div class="content">
            <a class="header">{{gambar.user_id}}</a>
            <div class="description">
             {{gambar.description}}<br>
             Likes : {{gambar.likes}}
            </div>
          </div>
          <div class="extra content">
            <a>
              <button @click="$emit('like',gambar._id, index)" type="button" class="ui button" data-toggle="modal" data-target="#myModal">
                Like
              </button>
            </a>
          </div>
        </div>
      </div>
  </div>
    `
  })
