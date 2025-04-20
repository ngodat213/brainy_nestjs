module.exports = {
  info: {
    name: 'English Learning API',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
  },
  item: [
    {
      name: 'Authentication',
      item: [
        {
          name: 'Register',
          request: {
            method: 'POST',
            url: '{{baseUrl}}/api/v1/auth/register',
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                email: 'user@example.com',
                password: 'password123',
                username: 'username'
              })
            }
          }
        },
        // ... other auth endpoints
      ]
    },
    {
      name: 'Lessons',
      item: [
        {
          name: 'Create Lesson',
          request: {
            method: 'POST',
            url: '{{baseUrl}}/api/v1/lessons',
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                title: 'Introduction to English',
                description: 'Basic English lesson',
                level: 'beginner',
                category: 'grammar',
                contentFileId: 'file123',
                contentUrl: 'https://example.com/content',
                order: 1,
                isPublished: false
              })
            }
          }
        },
        {
          name: 'Get All Lessons',
          request: {
            method: 'GET',
            url: '{{baseUrl}}/api/v1/lessons',
            query: [
              {
                key: 'level',
                value: 'beginner',
                disabled: true
              },
              {
                key: 'category',
                value: 'grammar',
                disabled: true
              },
              {
                key: 'published',
                value: 'true',
                disabled: true
              }
            ]
          }
        },
        {
          name: 'Get Lesson by ID',
          request: {
            method: 'GET',
            url: '{{baseUrl}}/api/v1/lessons/:id',
            pathVariables: [
              {
                key: 'id',
                value: 'lesson_id_here'
              }
            ]
          }
        },
        {
          name: 'Update Lesson',
          request: {
            method: 'PUT',
            url: '{{baseUrl}}/api/v1/lessons/:id',
            pathVariables: [
              {
                key: 'id',
                value: 'lesson_id_here'
              }
            ],
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                title: 'Updated Lesson Title',
                description: 'Updated lesson description',
                isPublished: true
              })
            }
          }
        },
        {
          name: 'Delete Lesson',
          request: {
            method: 'DELETE',
            url: '{{baseUrl}}/api/v1/lessons/:id',
            pathVariables: [
              {
                key: 'id',
                value: 'lesson_id_here'
              }
            ]
          }
        },
        {
          name: 'Update Lesson Order',
          request: {
            method: 'PUT',
            url: '{{baseUrl}}/api/v1/lessons/order',
            body: {
              mode: 'raw',
              raw: JSON.stringify([
                {
                  id: 'lesson1_id',
                  order: 1
                },
                {
                  id: 'lesson2_id',
                  order: 2
                }
              ])
            }
          }
        }
      ]
    }
  ]
}; 