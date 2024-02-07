# API Documentation

# Global expected output

- `success` : boolean (if `true`, request performed successfully, if `false`, request has failed)
- `data` : object (returned if `success == true` )
- `error` : object (returned if `success == false` )
    - `code` : int (the HTTP status code)
    - `message` : string (the error message)

# API Endpoints

## `GET` `/albums`

<aside>
🛡️ Retrieve all albums uids

</aside>

### Output

| Name | Type | Description |
| --- | --- | --- |
| album_uids | array | An array that contains all albums uids |

```json
{
  "album_uids": [
    "487fbfc2-a470-4800-8630-052e71588ddc",
    "1a29ef67-74d2-4119-8847-b1d152cf188c",
    "84288e3c-1fc0-488d-a843-8ab43388260a",
    ...
  ]
}
```

---

## `POST` `/album`

<aside>
🛡️ Create a new album entry

</aside>

### Input

Body :

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| title | string | true |  | The title of the album |
| description | string | true |  | The description of the album |
| password | string | true |  | The password to access the album. It should contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character |
| date | date | true |  | The album shooting date |
| url | string | false | The slug format of the album title | The url to access to the album content (will be converted to slug) |

```json
{
  "title": "This is my album title",
  "description": "This is my short album description",
  "password": "A$ecuredP4ssword",
  "date": "2024-06-02",
  "url": "my-first-client"
}
```

---

## `GET` `/album/:album_uid`

<aside>
🛡️ Retrieve album infos by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
fetchData(`/album/${albumId}`, "GET");
```

### Output

| Name | Type | Description |
| --- | --- | --- |
| title | string | The title of the target album |
| description | string | The description of the target album |
| thumbnail | string (Base64) | The thumbnail Base64 encoded image of the target album |
| uid | string | The uid of the target album |

```json
{
  "title": "This is my album title",
  "description": "This is my short album description",
  "thumbnail": "data:image/jpeg;base64,/9j/4AAQS............QABAAD/",
  "uid": "487fbfc2-a470-4800-8630-052e71588ddc"
}
```

---

## `GET` `/album/:album_uid`

<aside>
💻 Retrieve album infos by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
fetchData(`/album/${albumId}`, "GET");
```

### Output

| Name | Type | Description |
| --- | --- | --- |
| title | string | The title of the target album |
| description | string | The description of the target album |
| date  | date | The album shooting date |

```json
{
  "title": "This is my album title",
  "description": "This is my short album description",
  "date": "2024-06-02"
}
```

---

## `PATCH` `/album/:album_uid`

<aside>
🛡️ Update album infos by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |

Body :

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | false | The title of the album |
| description | string | false | The description of the album |
| password | string | false | The password to access the album. It should contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character |
| date | date | false | The album shooting date |
| url | string | false | The url to access to the album content (will be converted to slug) |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
fetchData(`/album/${albumId}`, "PATCH", {
  title: "My new album title",
  url: "my-new-custom-album-url",
});
```

---

## `DELETE` `/album/:album_uid`

<aside>
🛡️ Update album infos by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
fetchData(`/album/${albumId}`, "DELETE");
```

---

## `GET` `/album/:album_uid/image/:image_uid`

<aside>
💻 Retrieve album infos by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |
| :image_uid | string | The uid of the target image |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
const imageId = "40aa3586-eec3-41e1-aad3-b8068193e032";
fetchData(`/album/${albumId}/image/${imageId}`, "GET");
```

### Output

| Name | Type | Description |
| --- | --- | --- |
| name | string | null | The name of the target image |
| preview | string (Base64) | The preview Base64 encoded image of the target image |
| pinned  | bool | If the target image is pinned or not |
| uid  | string | The uid of the target image |

```json
{
  "title": "This is my album title",
  "description": "This is my short album description",
  "date": "2024-06-02"
}
```

---

## `POST` `/album/:album_uid/image/`

<aside>
🛡️ Create a new image entry

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |

Body :

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| name | string | false |  | The name of the image |
| pinned | bool | false | false | If the image is pinned in its album |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
fetchData(`/album/${albumId}/image`, "POST", {
  name: "A beautiful mountain",
  pinned: true,
});
```

---

## `PATCH` `/album/:album_uid/image/:image_uid`

<aside>
🛡️ Update image info by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |
| :image_uid | string | The uid of the target image |

Body :

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| name | string | false | The name of the image |
| pinned | bool | false | If the image is pinned in the album |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
const imageId = "40aa3586-eec3-41e1-aad3-b8068193e032";
fetchData(`/album/${albumId}/image/${imageId}`, "PATCH", {
  name: "An other beautiful mountain",
  pinned: false,
});
```

---

## `DELETE` `/album/:album_uid/image/:image_uid`

<aside>
🛡️ Remove image by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |
| :image_uid | string | The uid of the target image |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
const imageId = "40aa3586-eec3-41e1-aad3-b8068193e032";
fetchData(`/album/${albumId}/${imageId}`, "DELETE");
```

---

## `GET` `/album/:album_uid/images/download`

<aside>
💻 Retrieve album infos by id

</aside>

### Input

Query :

| Name | Type | Description |
| --- | --- | --- |
| :album_uid | string | The uid of the target album |

Body :

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| image_uids | array | true | An array of image uids to download |

```jsx
const albumId = "487fbfc2-a470-4800-8630-052e71588ddc";
const imageIds = [
  "eec40483-84bf-4b61-acc1-2687977e4018",
  "59a79092-21ba-4e92-96c2-64abd3cafe44",
  "d82ac93c-efcb-46c9-972f-f73b2ba16757",
  "bade4a94-f312-42ca-94e9-5bae03c10b2b",
  "66439a6a-a2e9-4d06-90a6-4202ff5550c0",
  "928cdcd3-e27d-4547-a7bd-748225ffc440",
	...
];
fetchData(`/album/${albumId}/images/download`, "GET", {
	image_uids: imageIds
});
```

### Output

If one target, download the image, else it download a `.zip` of all targeted images.