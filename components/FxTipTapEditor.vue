<template>
  <div class="tiptap-editor">
    <div>
      <v-item-group class="v-btn-toggle">
        <v-btn small :class="{ 'v-btn--active': h1 }" @click.stop="h1 = !h1">
          <v-icon>mdi-format-header-1</v-icon>
        </v-btn>
        <v-btn small :class="{ 'v-btn--active': h2 }" @click.stop="h2 = !h2">
          <v-icon>mdi-format-header-2</v-icon>
        </v-btn>
      </v-item-group>

      <v-item-group class="v-btn-toggle">
        <v-btn small :class="{ 'v-btn--active': bulletList }" @click.stop="bulletList = !bulletList">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <v-btn small :class="{ 'v-btn--active': orderedList }" @click.stop="orderedList = !orderedList">
          <v-icon>mdi-format-list-numbered</v-icon>
        </v-btn>
      </v-item-group>

      <v-item-group class="v-btn-toggle">
        <v-btn small :class="{ 'v-btn--active': subscript }" @click.stop="subscript = !subscript">
          <v-icon>mdi-format-subscript</v-icon>
        </v-btn>
        <v-btn small :class="{ 'v-btn--active': superscript }" @click.stop="superscript = !superscript">
          <v-icon>mdi-format-superscript</v-icon>
        </v-btn>
      </v-item-group>
      <v-item-group class="v-btn-toggle">
        <v-btn small :class="{ 'v-btn--active': bold }" @click.stop="bold = !bold">
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>
        <v-btn small :class="{ 'v-btn--active': italic }" @click.stop="italic = !italic">
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>
        <v-btn small :class="{ 'v-btn--active': underline }" @click.stop="underline = !underline">
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>
        <v-btn small :class="{ 'v-btn--active': strike }" @click.stop="strike = !strike">
          <v-icon>mdi-format-strikethrough</v-icon>
        </v-btn>
      </v-item-group>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'

export default {
  name: 'FxTipTapEditor',
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      editor: null,
    }
  },

  computed: {
    h1: {
      get () {
        return this.editor?.isActive('heading', { level: 1 })
      },
      set () {
        this.editor.chain().focus().toggleHeading({ level: 1 }).run()
      },
    },
    h2: {
      get () {
        return this.editor?.isActive('heading', { level: 2 })
      },
      set () {
        this.editor.chain().focus().toggleHeading({ level: 2 }).run()
      },
    },
    bulletList: {
      get () {
        return this.editor?.isActive('bulletList')
      },
      set () {
        this.editor.chain().focus().toggleBulletList().run()
      },
    },
    orderedList: {
      get () {
        return this.editor?.isActive('orderedList')
      },
      set () {
        this.editor.chain().focus().toggleOrderedList().run()
      },
    },
    italic: {
      get () {
        return this.editor?.isActive('italic')
      },
      set () {
        this.editor.chain().focus().toggleItalic().run()
      },
    },
    bold: {
      get () {
        return this.editor?.isActive('bold')
      },
      set () {
        this.editor.chain().focus().toggleBold().run()
      },
    },
    underline: {
      get () {
        return this.editor?.isActive('underline')
      },
      set () {
        this.editor.chain().focus().toggleUnderline().run()
      },
    },
    strike: {
      get () {
        return this.editor?.isActive('strike')
      },
      set () {
        this.editor.chain().focus().toggleStrike().run()
      },
    },
    subscript: {
      get () {
        return this.editor?.isActive('subscript')
      },
      set () {
        this.editor.chain().focus().toggleSubscript().run()
      },
    },
    superscript: {
      get () {
        return this.editor?.isActive('superscript')
      },
      set () {
        this.editor.chain().focus().toggleSuperscript().run()
      },
    },
  },

  watch: {
    value (value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted () {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Underline,
        Subscript,
        Superscript,
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  beforeDestroy () {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.tiptap-editor {
  border: 1px #999 solid;
  border-radius: 5px;
}
/* Basic editor styles */
.ProseMirror {
  outline: 0 solid transparent;
  margin: 5px;
  min-height: 300px;
  > * + * {
    margin-top: 0.75em;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color:#e9ecef;
    color: #495057;
  }
}
</style>
