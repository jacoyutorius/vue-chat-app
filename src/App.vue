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
            <section v-if="errors.length > 0" class="alerts">
              <div
                v-for="(error, j) in errors"
                v-bind:key="j"
                class="alert alert-danger"
                role="alert"
              >{{ error }}</div>
            </section>

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
                  class="invalid"
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
          <b-card
            v-for="(message, i) in messages"
            v-bind:key="i"
            v-bind:footer="message.userName + ' - ' + message.updatedAt"
            footer-tag="footer"
          >
            <b-media>
              <template v-slot:aside>
                <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
              </template>
              {{ message.context }}
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
      messages: [],
      modalShow: false,
      errors: []
    };
  },
  computed: {
    currentDate() {
      const d = new Date();
      return `${d.getFullYear()}-${d.getMonth() +
        1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    },
    formIsInValid() {
      return this.errors.length > 0;
    }
  },
  methods: {
    onPostMessage() {
      this.checkMessageParams();
      if (this.formIsInValid) {
        return false;
      }

      this.messages.push({
        userName: this.form.name,
        context: this.form.contents,
        updatedAt: this.currentDate
      });

      this.modalShow = false;
    },
    onCancel() {
      console.log("cancel");
      this.modalShow = false;
    },
    checkMessageParams() {
      this.errors = [];

      if (this.form.name === "") {
        this.errors.push('"Your Name" is required.');
      }
      if (this.form.contents === "") {
        this.errors.push('"Contents" is required.');
      }
    }
  }
};
</script>

<style>
.card {
  margin: 1em 0;
}
</style>
