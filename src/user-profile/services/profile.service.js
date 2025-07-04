import http from '/src/shared/services/http.js';

export class ProfileService {
    async getProfile(userId) {
        const response = await http.get(`/profile/${userId}`);
        return response.data;
    }

    async updateProfile(userId, profile) {
        const response = await http.put(`/profile/${userId}`, profile);
        return response.data;
    }
}