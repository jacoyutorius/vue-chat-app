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
              <b-form-group label="User:" label-for="user">
                <b-form-input id="user" v-model="form.user" required placeholder="Enter user"></b-form-input>
              </b-form-group>

              <b-form-group label="message" label-for="message">
                <b-form-textarea
                  id="message"
                  v-model="form.message"
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
          <b-card
            v-for="(chat, i) in chats"
            v-bind:key="i"
            v-bind:footer="chat.user + ' - ' + chat.created_at"
            footer-tag="footer"
          >
            <b-media>
              <template v-slot:aside>
                <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
              </template>
              {{ chat.message }}
            </b-media>
          </b-card>
        </section>
      </section>
    </b-container>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { createHmjsChat } from "@/graphql/mutations";
import { listHmjsChats } from "@/graphql/queries";
import { onCreateHmjsChat } from "@/graphql/subscriptions";

export default {
  user: "app",
  data() {
    return {
      form: {
        user: "",
        message: ""
      },
      chats: [],
      modalShow: false,
      errors: []
    };
  },
  computed: {
    formIsInValid() {
      return this.errors.length > 0;
    },
    chatParams() {
      return {
        ...this.form,
        created_at: new Date().toLocaleString()
      };
    }
  },

  async created() {
    // get chat list
    const listChats = await API.graphql(graphqlOperation(listHmjsChats));
    this.chats = listChats.data.listHmjsChats.items;

    // subscribe
    const subscription = API.graphql(
      graphqlOperation(onCreateHmjsChat)
    ).subscribe({
      next: chat => {
        this.chats.push(chat.value.data.onCreateHmjsChat);
      }
    });
  },

  methods: {
    onPostMessage() {
      this.checkMessageParams();
      if (this.formIsInValid) {
        return;
      }

      this.postMessage();

      this.modalShow = false;
    },
    async postMessage() {
      await API.graphql(
        graphqlOperation(createHmjsChat, {
          input: this.chatParams
        })
      ).catch(error => {
        console.error(error);
      });
    },
    onCancel() {
      this.modalShow = false;
    },
    checkMessageParams() {
      this.errors = [];

      if (this.form.user === "") {
        this.errors.push('"User" is required.');
      }
      if (this.form.message === "") {
        this.errors.push('"message" is required.');
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
