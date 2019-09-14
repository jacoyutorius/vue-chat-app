<template>
  <div id="app">
    <header>
      <b-navbar variant="info" type="dark">
        <b-navbar-brand href="#">Vue Chat</b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button @click="modalShow = !modalShow" variant="light">Post</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </header>

    <b-container>
      <section class="form">
        <section>
          <b-modal v-model="modalShow" size="lg" title="Post chat message">
            <b-form>
              <b-form-group label="Your Name:" label-for="name">
                <b-form-input id="name" v-model="form.name" required placeholder="Enter name"></b-form-input>
              </b-form-group>

              <b-form-group label="Contents" label-for="contents">
                <b-form-textarea
                  id="contents"
                  v-model="form.contents"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-form>

            <template v-slot:modal-footer="{ submit, cancel, close }">
              <b-button variant="success" @click="onPostMessage">Submit</b-button>
              <b-button variant="default" @click="onCancel">Cancel</b-button>
            </template>
          </b-modal>
        </section>

        <section>
          <b-card footer="yutoogi - 2019-09-14 23:59" footer-tag="footer">
            <b-media>
              <template v-slot:aside>
                <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
              </template>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
              Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
              ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </b-media>
          </b-card>

          <b-card footer="yutoogi - 2019-09-14 23:59" footer-tag="footer">
            <b-media>
              <template v-slot:aside>
                <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
              </template>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
              Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
              ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </b-media>
          </b-card>

          <b-card footer="yutoogi - 2019-09-14 23:59" footer-tag="footer">
            <b-media>
              <template v-slot:aside>
                <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
              </template>
              Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
              Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
              ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </b-media>
          </b-card>
        </section>
      </section>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      form: {
        name: "",
        contents: ""
      },
      modalShow: false
    };
  },
  computed: {},
  methods: {
    onPostMessage() {
      console.log("submit");
      this.modalShow = false;
    },
    onCancel() {
      console.log("cancel");
      this.modalShow = false;
    }
  }
};
</script>

<style>
.card {
  margin: 1em 0;
}
</style>
