class JobUrls {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    getJobs(title = '') {
        const url = new URL(`${this.baseUrl}/jobs`);

        if (title) {
            url.searchParams.set('title', title);
        }

        return url.toString();
    }

    getJobById(id) {
        return `${this.baseUrl}/jobs/${id}`;
    }

    createJob() {
        return `${this.baseUrl}/jobs`;
    }

    updateJobById(id) {
        return `${this.baseUrl}/jobs/${id}`;
    }

    removeJobById(id) {
        return `${this.baseUrl}/jobs/${id}`;
    }
}

export const jobUrls = new JobUrls();
