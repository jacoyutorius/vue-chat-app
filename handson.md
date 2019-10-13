footer: Hamamatsu.js Amplify + Vue.js Handson @jacoyutorius
slidenumbers: true

# Vue handson

### Hamamatsu.js #2019.11

#### @jacoyutorius

---

## Yuto Ogi

### @jacoyutorius

Web developer, AIRS

- AWS
- Ruby
- Javascript

![left](https://i.gyazo.com/bb651994b500258e04b119444398cdab.png) 

---

#[fit] ※ AWS関連のリソースはこちらで提供しますが、ハンズオン後数日以内にそれらのリソースは削除します。

---

# Stages

1. create vue project
2. install Bootstrap
3. chat mockup
4. integrate Chat API

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

```
$ npm run serve
$ open http://localhost:8080
```

---

![https://i.gyazo.com/b605ecb9f9504763356f562fa8ffd805.png](https://i.gyazo.com/b605ecb9f9504763356f562fa8ffd805.png)

---

# 1. create vue project

**done**

- Vueアプリケーションの初期化 

**point**

- Vue の初期画面が表示されること

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
```

---

### 2. install Bootstrap

**src/main.js**

```js
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```

---

### 2. install Bootstrap

**src/main.js**

```js
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

---

### 2. install Bootstrap

**src/App.vue**

```html
<div id="app">
  <b-container>
    <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
      <p>For more information visit our website</p>
      <b-btn variant="primary" href="https://bootstrap-vue.js.org/">More Info</b-btn>
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

### 2. install Bootstrap

**src/App.vue**

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
}
```

---

![https://i.gyazo.com/7f519243476553db3987a0e84a9b8d27.png](https://i.gyazo.com/7f519243476553db3987a0e84a9b8d27.png)

---

![](https://i.gyazo.com/f162259c1121d8b3c4e99ee2f7467db3.png) 

---

# 2. install Bootstrap

**point**

- Vue.js devtools でコンポーネントのプロパティを確認する

![](https://i.gyazo.com/f162259c1121d8b3c4e99ee2f7467db3.png)	

---

## 3. mockup

---

### 3. mockup

**src/App.vue**

```html
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
```

---

### 3. mockup

**src/App.vue**

```html
    <b-container>
      <section class="form">
        <section>
          <b-modal v-model="modalShow" size="lg" title="Post chat message">
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
```

---

### 3. mockup

**src/App.vue**

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

### 3. mockup

**src/App.vue**

```js
export default {
  name: "app",
  data() {
    return {
      form: {
        user: "",
        message: ""
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
````

---

### 3. mockup

**src/App.vue**

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

# 3. mockup

**point**

- モーダルダイアログの "Submit" をクリックすると console.log が出力される
- モーダルダイアログの "Cancel" または 右上の "x" またはダイアログ外のエリアをクリックするとモーダルダイアログが閉じる
	
---

## 3 - 1. click event

"Submit" ボタンをクリックするとチャットメッセージが登録される。 

---

### 3 - 1. click event

**src/App.vue**

```html
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
```

---

### 3 - 1. click event

**src/App.vue**

```js
methods: {
  onPostMessage() {
    this.messages.push({
      user: this.form.user,
      message: this.form.message,
      created_at: new Date().toLocaleString()
    });

    this.modalShow = false;
  },
````

---

## 3 - 2. validation

#### ユーザー名・メッセージが入力されていない場合、エラーメッセージを表示する。

---

### 3 - 2. validation

**src/App.vue**

```html
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
````

---

### 3 - 2. validation

**src/App.vue**

```js
data() {
  return {
  	~ (略) ~
    errors: []
  };
},
onPostMessage() {
  this.checkMessageParams();
  if (this.formIsInValid) {
    return;
  }  

  ~ (略) ~
},
checkMessageParams() {
  if (this.form.user === "") {
    this.errors.push('"User" is required.');
  }
  if (this.form.message === "") {
    this.errors.push('"Message" is required.');
  }
}
````

---

## 4. integrate Chat API

---

## 4 - 1. copy AWS setting

#### AWSの設定ファイルを組み込む

---

## 4 - 1. copy AWS setting

**src/aws-exports.js**

```js
const awsmobile = {
  "aws_project_region": "ap-northeast-1",
  "aws_appsync_graphqlEndpoint": "https://izjtvc7nijhrrihcnxu2umyuzy.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  "aws_appsync_region": "ap-northeast-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": ""
};

export default awsmobile;
````

---

## 4 - 1. copy AWS setting

**src/graphql**

---

copy amplify AWS files

```bash
$ tree src
src
├── App.vue
├── assets
│   └── logo.png
├── aws-exports.js
├── components
│   └── HelloWorld.vue
├── graphql
│   ├── mutations.js
│   ├── queries.js
│   ├── schema.json
│   └── subscriptions.js
└── main.js

3 directories, 9 files
```

---

## 4 - 2. install aws-amplify

#### aws-amplify をインストールする

---

## 4 - 2. install aws-amplify

```bash
$ npm install aws-amplify
$ npm install aws-amplify-vue
```

---

## 4 - 2. install aws-amplify

**src/main.js**

```js
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules)
```

---

## 4 - 3. Query

#### 画面読み込み時に登録されているチャットメッセージを取得して画面に表示する。

---

## 4 - 3. Query

**src/App.vue**

```js
import {
  API,
  graphqlOperation
} from "aws-amplify";
import { listHmjsChats } from "@/graphql/queries";

~ 略 ~

async created() {
  // get chat list
  const listChats = await API.graphql(graphqlOperation(listHmjsChats));
  this.chats = listChats.data.listHmjsChats.items;
````

---

## 4 - 4. Post

#### メッセージをAPIにPOSTする。

---

## 4 - 4. Post

**src/App.vue**

```js
import { createHmjsChat } from "@/graphql/mutations";

computed: {
  ~ 略 ~
  chatParams() {
    return {
      ...this.form,
      created_at: new Date().toLocaleString()
    };
  }
},
````

---

## 4 - 4. Post

**src/App.vue**

```js
onPostMessage() {
  this.checkMessageParams();
  if (this.formIsInValid) {
    return;
  }

  this.postMessage();

  this.modalShow = false;
},
```

---

## 4 - 4. Post

**src/App.vue**

```js
async postMessage() {
  await API.graphql(
    graphqlOperation(createHmjsChat, {
      input: this.chatParams
    })
  ).catch(error => {
    console.error(error);
  });
},
```

---

## 4 - 5. Subscribe

#### データベースへの更新を購読する。

---

## 4 - 5. Subscribe

**src/App.vue**

```js
import { onCreateHmjsChat } from "@/graphql/subscriptions";
```

```js
created() {
  const subscription = API.graphql(
    graphqlOperation(onCreateHmjsChat)
  ).subscribe({
    next: chat => {
      this.chats.push(chat.value.data.onCreateHmjsChat);
    }
  });
},
```

---

![inline](https://i.gyazo.com/bf61c6fa1d1ffa221546db72522bec05.gif)

お疲れさまでした。