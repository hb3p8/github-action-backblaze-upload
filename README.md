# Backblaze B2 upload action

GitHub Action to upload files or folders to Backblaze B2

`file_input` can be a directory, all files gonna be uploaded recursively and use the `file_output` as relative path.

If `file_input` is a directory, make the `file_output` a directory too

```yaml
jobs:
  upload-to-backblaze-b2:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - uses: PedroGabriel/github-action-backblaze-upload@1.0.0
        with:
          key_id: 'fnaufhaihfaifh'
          application_key: 'djsaifhasufgsaf'
          bucket: 'bucket-name'
          file_input: '/home/user/my/file/path or C:\my\file\path'
          file_output: 'some_folder_inside_root/some_subfolder/final_folder/file.ext'
```
