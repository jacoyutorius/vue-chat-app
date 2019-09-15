footer: Hamamatsu.js Amplify + Vue.js Handson @jacoyutorius
slidenumbers: true

# Vue hands-on

### Hamamatsu.js #2019.11

#### @jacoyutorius

---

#[fit] ※ AWS 関連のリソースはこちらで提供しますが、ハンズオン後数日後にそれらのリソースは削除します。

---

# Stages

1. create vue project
2. install Bootstrap
3. chat mockup
4. get chat messages from AWS
5. post to AWS

---

## before handson

- Node.js
- install @vue/cli
- Vue.js devtools (Chrome plugin)

---

versions

```bash
$ node -v
v10.14.1

$ npm -v
6.11.3
```

---

## 1. create vue project

---

```bash
$ vue create vue-chat-app

Vue CLI v3.2.1
┌────────────────────────────┐
│  Update available: 3.11.0  │
└────────────────────────────┘
? Please pick a preset: default (babel, eslint)


✨  Done in 16.32s.
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project vue-chat-app.
```

```
$ cd vue-chat-app
$ subl . / atom . / code .
```

---

```bash
$ tree -L 1
.
├── README.md
├── babel.config.js
├── node_modules
├── package.json
├── public
├── src
└── yarn.lock

3 directories, 4 files
```

---

Vue の初期画面が表示される。

```
$ npm run serve
$ open http://localhost:8080
```

![https://i.gyazo.com/b605ecb9f9504763356f562fa8ffd805.png](https://i.gyazo.com/b605ecb9f9504763356f562fa8ffd805.png)

---

## 2. install Bootstrap

---

```bash
$ npm install bootstrap-vue bootstrap core-js
```

```
> bootstrap-vue@2.0.1 postinstall /Users/yuto-ogi/Work/aws_amplify/vue-chat-app/node_modules/bootstrap-vue
> opencollective || exit 0

                       ;XXXXXXXXXXXX333333333XXXXXXXXXXXXX;
                        :2XXXXXXXXXXSisssssiSXXXXXXXXXXX2:
                       .;S3XXXXXXXXX, .,,,,..,SXXXXXXXX3S;,
                      .:SX2222XXXXXX, :XXXXS. r3XXXX2222X2;.
                      .riiiiii5XXXXX, .;;;;, :2XXXX5iiiiiir.
                        ;iiiiiiSXXXX, ,rrrr;,.;XXXSiiiiii;
                         ;iiiiiiS2XX, ;3333X; .2XSiiiiii;
                          :siiiiii2X, .::::,..r2iiiiiis:
                           ,siiiiii2isrrrrrsi22iiiiiis,
                            ,riiiiii23333333X2iiiiiir,
                             .riiiiii5XXXXXX5iiiiiir.
                              .;iiiiiiSXXXXSiiiiii;.
                                ;iiiiiiSXXSiiiiii;
                                 :siiiiiiiiiiiis:
                                  ,siiiiiiiiiis,
                                   ,riiiiiiiir,
                                    .riiiiiir.
                                     .;iiii;.
                                       ;ii;
                                        ;;

                      Thanks for installing bootstrap-vue 🙏
                 Please consider donating to our open collective
                        to help us maintain this package.

                           Number of contributors: 230
                              Number of backers: 41
                             Annual budget: US$ 1,066
                            Current balance: US$ 1,525
```

---

## src/main.js

```js
+ import BootstrapVue from 'bootstrap-vue'
+ import 'bootstrap/dist/css/bootstrap.css'
+ import 'bootstrap-vue/dist/bootstrap-vue.css'

+ Vue.use(BootstrapVue)
```

---

## src/main.js

```js
import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
```

---

## src/App.vue

```html
<div id="app">
  <b-container>
    <b-jumbotron
      header="BootstrapVue"
      lead="Bootstrap v4 Components for Vue.js 2"
    >
      <p>For more information visit our website</p>
      <b-btn variant="primary" href="https://bootstrap-vue.js.org/"
        >More Info</b-btn
      >
    </b-jumbotron>

    <b-form-group
      horizontal
      :label-cols="4"
      description="Let us know your name."
      label="Enter your name"
    >
      <b-form-input v-model.trim="name"></b-form-input>
    </b-form-group>

    <b-alert variant="success" :show="showAlert">Hello {{ name }}</b-alert>
  </b-container>
</div>
```

---

## src/App.vue

```js
export default {
  name: "app",
  data() {
    return {
      name: ""
    };
  },
  computed: {
    showAlert() {
      return this.name.length > 4 ? true : false;
    }
  }
};
```

---

![https://i.gyazo.com/7f519243476553db3987a0e84a9b8d27.png](https://i.gyazo.com/7f519243476553db3987a0e84a9b8d27.png)

---

# 3. mockup

---

# <template> - 1

```html
<div id="app">
  <header>
    <b-navbar variant="info" type="dark">
      <b-navbar-brand href="#">Vue Chat</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button @click="modalShow = !modalShow" variant="light"
            >Post</b-button
          >
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </header>
</div>
```

---

# <template> - 2

```html
<b-container>
  <section class="form">
    <section>
      <b-modal v-model="modalShow" size="lg" title="Post chat message">
        <b-form>
          <b-form-group label="Your Name:" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
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
  </section></b-container
>
```

---

# <template> - 3

```html

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

        </section>
      </section>
    </b-container>
  </div>
```

---

# <script>

```js
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
```

---

# <style>

```css
.card {
  margin: 1em 0;
}
```

---

![](https://i.gyazo.com/6b94ebf0eea32458ec9f997de71122ab.png)

---

![](https://i.gyazo.com/88cc423f5d6c6cf248ba3d5409f758be.png)

---
