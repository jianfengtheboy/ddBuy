export const formatMixin = {
  methods: {
    formatTime(val) {
      return parseInt(val) >= 10 ? val : '0' + val
    }
  }
}
