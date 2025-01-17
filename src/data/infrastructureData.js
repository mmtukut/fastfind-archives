console.log('Loading infrastructure data...');

export const infrastructureData = {
  categories: [
    {
      id: 'hospitals',
      type: 'hospital',
      label: 'Healthcare',
      color: '#ef4444',
      icon: '🏥',
      items: [
        {
          id: 1,
          name: 'Federal Teaching Hospital',
          location: 'Gombe Central',
          coordinates: [11.167, 10.283],
          status: 'operational',
          category: 'Tertiary',
          capacity: '500 beds',
          rating: 4.5,
          lastUpdated: '2024',
          image: '/images/hospital1.jpg',
          amenities: ['Emergency', 'Surgery', 'ICU', 'Outpatient']
        },
        {
          id: 2,
          name: 'Gombe Specialist Hospital',
          location: 'New Mile 3',
          coordinates: [11.172, 10.287],
          status: 'operational',
          category: 'Secondary',
          capacity: '200 beds',
          rating: 4.3,
          lastUpdated: '2024',
          image: '/images/hospital2.jpg',
          amenities: ['Emergency', 'Laboratory', 'Pharmacy']
        }
      ]
    },
    {
      id: 'schools',
      type: 'education',
      label: 'Education',
      color: '#3b82f6',
      icon: '🏫',
      items: [
        {
          id: 3,
          name: 'Gombe State University',
          location: 'Tudun Wada',
          coordinates: [11.169, 10.285],
          status: 'operational',
          category: 'University',
          capacity: '15,000 students',
          rating: 4.2,
          lastUpdated: '2024',
          image: '/images/university1.jpg',
          amenities: ['Library', 'Labs', 'Sports Complex', 'Hostels']
        },
        {
          id: 4,
          name: 'Federal College of Education',
          location: 'Gombe',
          coordinates: [11.165, 10.281],
          status: 'operational',
          category: 'Tertiary',
          capacity: '8,000 students',
          rating: 4.0,
          lastUpdated: '2024',
          image: '/images/college1.jpg',
          amenities: ['Library', 'Labs', 'Sports Facilities']
        }
      ]
    },
    {
        id: 'roads',
        type: 'transportation',
        label: 'Transportation',
        color: '#f59e0b',
        icon: '🚉',
        items: [
          {
            id: 5,
            name: 'Gombe Central Terminal',
            location: 'City Center',
            coordinates: [11.168, 10.284],
            status: 'operational',
            category: 'Transport Hub',
            capacity: '50,000 daily',
            rating: 4.0,
            lastUpdated: '2024',
            image: '/images/terminal1.jpg',
            amenities: ['Parking', 'Waiting Area', 'Ticketing']
          },
          {
            id: 6,
            name: 'Gombe Airport',
            location: 'Lawanti',
            coordinates: [11.173, 10.298],
            status: 'operational',
            category: 'Airport',
            capacity: '5,000 daily',
            rating: 3.8,
            lastUpdated: '2024',
            image: '/images/airport1.jpg',
            amenities: ['Terminal', 'Parking', 'Security']
          }
        ]
      },    {
        id: 'transport',
        type: 'transportation',
        label: 'Transportation',
        color: '#f59e0b',
        icon: '🚉',
        items: [
          {
            id: 5,
            name: 'Gombe Central Terminal',
            location: 'City Center',
            coordinates: [11.168, 10.284],
            status: 'operational',
            category: 'Transport Hub',
            capacity: '50,000 daily',
            rating: 4.0,
            lastUpdated: '2024',
            image: '/images/terminal1.jpg',
            amenities: ['Parking', 'Waiting Area', 'Ticketing']
          },
          {
            id: 6,
            name: 'Gombe Airport',
            location: 'Lawanti',
            coordinates: [11.173, 10.298],
            status: 'operational',
            category: 'Airport',
            capacity: '5,000 daily',
            rating: 3.8,
            lastUpdated: '2024',
            image: '/images/airport1.jpg',
            amenities: ['Terminal', 'Parking', 'Security']
          }
        ]
      },
      {
        id: 'utilities',
        type: 'transportation',
        label: 'Transportation',
        color: '#f59e0b',
        icon: '🚉',
        items: [
          {
            id: 5,
            name: 'Gombe Central Terminal',
            location: 'City Center',
            coordinates: [11.168, 10.284],
            status: 'operational',
            category: 'Transport Hub',
            capacity: '50,000 daily',
            rating: 4.0,
            lastUpdated: '2024',
            image: '/images/terminal1.jpg',
            amenities: ['Parking', 'Waiting Area', 'Ticketing']
          },
          {
            id: 6,
            name: 'Gombe Airport',
            location: 'Lawanti',
            coordinates: [11.173, 10.298],
            status: 'operational',
            category: 'Airport',
            capacity: '5,000 daily',
            rating: 3.8,
            lastUpdated: '2024',
            image: '/images/airport1.jpg',
            amenities: ['Terminal', 'Parking', 'Security']
          }
        ]
      },
      {
        id: 'development',
        type: 'transportation',
        label: 'Transportation',
        color: '#f59e0b',
        icon: '🚉',
        items: [
          {
            id: 5,
            name: 'Gombe Central Terminal',
            location: 'City Center',
            coordinates: [11.168, 10.284],
            status: 'operational',
            category: 'Transport Hub',
            capacity: '50,000 daily',
            rating: 4.0,
            lastUpdated: '2024',
            image: '/images/terminal1.jpg',
            amenities: ['Parking', 'Waiting Area', 'Ticketing']
          },
          {
            id: 6,
            name: 'Gombe Airport',
            location: 'Lawanti',
            coordinates: [11.173, 10.298],
            status: 'operational',
            category: 'Airport',
            capacity: '5,000 daily',
            rating: 3.8,
            lastUpdated: '2024',
            image: '/images/airport1.jpg',
            amenities: ['Terminal', 'Parking', 'Security']
          }
        ]
      },
    {
      id: 'markets',
      type: 'commercial',
      label: 'Markets',
      color: '#10b981',
      icon: '🏪',
      items: [
        {
          id: 7,
          name: 'Gombe Main Market',
          location: 'Central Business District',
          coordinates: [11.166, 10.282],
          status: 'operational',
          category: 'Traditional Market',
          capacity: '2000 shops',
          rating: 4.1,
          lastUpdated: '2024',
          image: '/images/market1.jpg',
          amenities: ['Storage', 'Parking', 'Security']
        }
      ]
    },
    {
      id: 'government',
      type: 'government',
      label: 'Government',
      color: '#6366f1',
      icon: '🏛️',
      items: [
        {
          id: 8,
          name: 'Gombe State Secretariat',
          location: 'State Secretariat Complex',
          coordinates: [11.164, 10.284],
          status: 'operational',
          category: 'Administrative',
          capacity: 'N/A',
          rating: 4.0,
          lastUpdated: '2024',
          image: '/images/govt1.jpg',
          amenities: ['Offices', 'Conference Halls', 'Parking']
        }
      ]
    }
  ]
};

// Add console log to verify data structure
console.log('Infrastructure data loaded:', infrastructureData);