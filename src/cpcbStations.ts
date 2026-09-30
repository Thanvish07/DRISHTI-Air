export interface CpcbStationSeed {
  id: string;
  name: string;
  city: string;
  state: string;
  baseAqi: number;
  lat: number;
  lng: number;
  zone: 'North' | 'South' | 'West' | 'East' | 'Central' | 'Northeast';
}

/**
 * Curated ground monitoring network representing CPCB CAAQMS stations across India
 * Extracted and aligned with: https://airquality.cpcb.gov.in/ccr/#/all-india-aqi-portal
 * Covering 28 States and Union Territories with diverse urban, industrial, commercial, and rural stations.
 */
export const CPCB_ALL_INDIA_STATIONS: CpcbStationSeed[] = [
  // --- DELHI NCR (Capital Region Hotspots) ---
  { id: 'DL001', name: 'Anand Vihar CAAQMS, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 368, lat: 28.6469, lng: 77.3164, zone: 'North' },
  { id: 'DL002', name: 'R K Puram, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 288, lat: 28.5660, lng: 77.1767, zone: 'North' },
  { id: 'DL003', name: 'Punjabi Bagh, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 322, lat: 28.6692, lng: 77.1314, zone: 'North' },
  { id: 'DL004', name: 'ITO Traffic Intersection, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 310, lat: 28.6289, lng: 77.2415, zone: 'North' },
  { id: 'DL005', name: 'Jawaharlal Nehru Stadium, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 274, lat: 28.5828, lng: 77.2344, zone: 'North' },
  { id: 'DL006', name: 'Bawana Industrial Area, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 382, lat: 28.7762, lng: 77.0510, zone: 'North' },
  { id: 'DL007', name: 'Wazirpur Industrial Area, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 375, lat: 28.6997, lng: 77.1654, zone: 'North' },
  { id: 'DL008', name: 'Mundka Commercial Corridor, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 360, lat: 28.6833, lng: 77.0333, zone: 'North' },
  { id: 'DL009', name: 'Major Dhyan Chand National Stadium, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 262, lat: 28.6127, lng: 77.2372, zone: 'North' },
  { id: 'DL010', name: 'Okhla Phase-2 Industrial Area, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 335, lat: 28.5308, lng: 77.2713, zone: 'North' },
  { id: 'DL011', name: 'Sonia Vihar Water Treatment, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 295, lat: 28.7107, lng: 77.2514, zone: 'North' },
  { id: 'DL012', name: 'Sri Aurobindo Marg, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 250, lat: 28.5435, lng: 77.2064, zone: 'North' },
  { id: 'DL013', name: 'Rohini Sector-16, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 345, lat: 28.7324, lng: 77.1197, zone: 'North' },
  { id: 'DL014', name: 'Narela Industrial Sub-City, Delhi', city: 'Delhi', state: 'Delhi', baseAqi: 366, lat: 28.8527, lng: 77.0927, zone: 'North' },

  // --- HARYANA (NCR & Industrial Hubs) ---
  { id: 'HR001', name: 'Sector 51 Sub-City, Gurugram', city: 'Gurugram', state: 'Haryana', baseAqi: 342, lat: 28.4312, lng: 77.0709, zone: 'North' },
  { id: 'HR002', name: 'Vikas Sadan, Gurugram', city: 'Gurugram', state: 'Haryana', baseAqi: 315, lat: 28.4601, lng: 77.0263, zone: 'North' },
  { id: 'HR003', name: 'Teri Gram, Gwal Pahari, Gurugram', city: 'Gurugram', state: 'Haryana', baseAqi: 230, lat: 28.4285, lng: 77.1517, zone: 'North' },
  { id: 'HR004', name: 'Sector 16A Commercial, Faridabad', city: 'Faridabad', state: 'Haryana', baseAqi: 358, lat: 28.4116, lng: 77.3134, zone: 'North' },
  { id: 'HR005', name: 'New Industrial Town (NIT), Faridabad', city: 'Faridabad', state: 'Haryana', baseAqi: 372, lat: 28.3846, lng: 77.3012, zone: 'North' },
  { id: 'HR006', name: 'Sector 6 HUDA, Panipat', city: 'Panipat', state: 'Haryana', baseAqi: 284, lat: 29.3909, lng: 76.9635, zone: 'North' },
  { id: 'HR007', name: 'Arya Nagar, Sonipat', city: 'Sonipat', state: 'Haryana', baseAqi: 310, lat: 28.9931, lng: 77.0151, zone: 'North' },
  { id: 'HR008', name: 'Panchkula Sector 6, Panchkula', city: 'Panchkula', state: 'Haryana', baseAqi: 142, lat: 30.6942, lng: 76.8606, zone: 'North' },
  { id: 'HR009', name: 'Karnal Mini Secretariat, Karnal', city: 'Karnal', state: 'Haryana', baseAqi: 245, lat: 29.6857, lng: 76.9905, zone: 'North' },
  { id: 'HR010', name: 'Rohtak MD University Campus, Rohtak', city: 'Rohtak', state: 'Haryana', baseAqi: 268, lat: 28.8955, lng: 76.6066, zone: 'North' },

  // --- UTTAR PRADESH (Indo-Gangetic Plain) ---
  { id: 'UP001', name: 'Lalbagh Central, Lucknow', city: 'Lucknow', state: 'Uttar Pradesh', baseAqi: 334, lat: 26.8467, lng: 80.9462, zone: 'North' },
  { id: 'UP002', name: 'Talkatora Industrial Area, Lucknow', city: 'Lucknow', state: 'Uttar Pradesh', baseAqi: 352, lat: 26.8306, lng: 80.8936, zone: 'North' },
  { id: 'UP003', name: 'Gomti Nagar Residential, Lucknow', city: 'Lucknow', state: 'Uttar Pradesh', baseAqi: 278, lat: 26.8530, lng: 80.9984, zone: 'North' },
  { id: 'UP004', name: 'Vasundhara Sector 4A, Ghaziabad', city: 'Ghaziabad', state: 'Uttar Pradesh', baseAqi: 365, lat: 28.6603, lng: 77.3573, zone: 'North' },
  { id: 'UP005', name: 'Loni Industrial Belt, Ghaziabad', city: 'Ghaziabad', state: 'Uttar Pradesh', baseAqi: 395, lat: 28.7516, lng: 77.2882, zone: 'North' },
  { id: 'UP006', name: 'Sector 62 Institutional, Noida', city: 'Noida', state: 'Uttar Pradesh', baseAqi: 328, lat: 28.6276, lng: 77.3629, zone: 'North' },
  { id: 'UP007', name: 'Knowledge Park III, Greater Noida', city: 'Greater Noida', state: 'Uttar Pradesh', baseAqi: 348, lat: 28.4744, lng: 77.4912, zone: 'North' },
  { id: 'UP008', name: 'Ardhali Bazar, Varanasi', city: 'Varanasi', state: 'Uttar Pradesh', baseAqi: 275, lat: 25.3411, lng: 82.9813, zone: 'North' },
  { id: 'UP009', name: 'BHU Campus, Varanasi', city: 'Varanasi', state: 'Uttar Pradesh', baseAqi: 218, lat: 25.2677, lng: 82.9913, zone: 'North' },
  { id: 'UP010', name: 'Sanjay Palace Commercial, Agra', city: 'Agra', state: 'Uttar Pradesh', baseAqi: 298, lat: 27.2023, lng: 77.9995, zone: 'North' },
  { id: 'UP011', name: 'Taj East Gate Eco-Zone, Agra', city: 'Agra', state: 'Uttar Pradesh', baseAqi: 220, lat: 27.1729, lng: 78.0463, zone: 'North' },
  { id: 'UP012', name: 'Nehru Nagar, Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', baseAqi: 340, lat: 26.4735, lng: 80.3276, zone: 'North' },
  { id: 'UP013', name: 'Civil Lines, Prayagraj (Allahabad)', city: 'Prayagraj', state: 'Uttar Pradesh', baseAqi: 285, lat: 25.4529, lng: 81.8349, zone: 'North' },
  { id: 'UP014', name: 'Madan Mohan Malviya University, Gorakhpur', city: 'Gorakhpur', state: 'Uttar Pradesh', baseAqi: 270, lat: 26.7360, lng: 83.4332, zone: 'North' },
  { id: 'UP015', name: 'Pallavpuram, Meerut', city: 'Meerut', state: 'Uttar Pradesh', baseAqi: 332, lat: 29.0494, lng: 77.7289, zone: 'North' },
  { id: 'UP016', name: 'Transport Nagar, Moradabad', city: 'Moradabad', state: 'Uttar Pradesh', baseAqi: 312, lat: 28.8258, lng: 78.7516, zone: 'North' },

  // --- MAHARASHTRA (Western Hub) ---
  { id: 'MH001', name: 'Bandra Kurla Complex (BKC), Mumbai', city: 'Mumbai', state: 'Maharashtra', baseAqi: 172, lat: 19.0657, lng: 72.8687, zone: 'West' },
  { id: 'MH002', name: 'Colaba Coastal Observatory, Mumbai', city: 'Mumbai', state: 'Maharashtra', baseAqi: 118, lat: 18.9067, lng: 72.8147, zone: 'West' },
  { id: 'MH003', name: 'Kandivali West Residential, Mumbai', city: 'Mumbai', state: 'Maharashtra', baseAqi: 154, lat: 19.2064, lng: 72.8364, zone: 'West' },
  { id: 'MH004', name: 'Sion Circle Industrial/Traffic, Mumbai', city: 'Mumbai', state: 'Maharashtra', baseAqi: 196, lat: 19.0390, lng: 72.8619, zone: 'West' },
  { id: 'MH005', name: 'Worli Sea Face, Mumbai', city: 'Mumbai', state: 'Maharashtra', baseAqi: 104, lat: 19.0166, lng: 72.8183, zone: 'West' },
  { id: 'MH006', name: 'Deonar Dumping Ground Perimeter, Mumbai', city: 'Mumbai', state: 'Maharashtra', baseAqi: 235, lat: 19.0560, lng: 72.9234, zone: 'West' },
  { id: 'MH007', name: 'Shivajinagar Central, Pune', city: 'Pune', state: 'Maharashtra', baseAqi: 145, lat: 18.5314, lng: 73.8446, zone: 'West' },
  { id: 'MH008', name: 'Katraj Snake Park Zoo, Pune', city: 'Pune', state: 'Maharashtra', baseAqi: 96, lat: 18.4555, lng: 73.8672, zone: 'West' },
  { id: 'MH009', name: 'Bhosari Industrial Estate, PCMC Pune', city: 'Pune', state: 'Maharashtra', baseAqi: 182, lat: 18.6298, lng: 73.8488, zone: 'West' },
  { id: 'MH010', name: 'Civil Lines, Nagpur', city: 'Nagpur', state: 'Maharashtra', baseAqi: 125, lat: 21.1524, lng: 79.0736, zone: 'West' },
  { id: 'MH011', name: 'MIDC Tarapur Industrial, Palghar', city: 'Palghar', state: 'Maharashtra', baseAqi: 188, lat: 19.8247, lng: 72.6931, zone: 'West' },
  { id: 'MH012', name: 'Gangapur Road, Nashik', city: 'Nashik', state: 'Maharashtra', baseAqi: 110, lat: 20.0110, lng: 73.7667, zone: 'West' },
  { id: 'MH013', name: 'Mahad Industrial Area, Raigad', city: 'Mahad', state: 'Maharashtra', baseAqi: 165, lat: 18.0833, lng: 73.4167, zone: 'West' },
  { id: 'MH014', name: 'Chandrapur Thermal Colony, Chandrapur', city: 'Chandrapur', state: 'Maharashtra', baseAqi: 228, lat: 19.9615, lng: 79.2961, zone: 'West' },
  { id: 'MH015', name: 'Sector 19 Kopar Khairane, Navi Mumbai', city: 'Navi Mumbai', state: 'Maharashtra', baseAqi: 168, lat: 19.1027, lng: 73.0031, zone: 'West' },

  // --- KARNATAKA (Southern Technology Hub) ---
  { id: 'KA001', name: 'BTM Layout Residential, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 82, lat: 12.9166, lng: 77.6101, zone: 'South' },
  { id: 'KA002', name: 'Silk Board Junction Traffic Hub, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 124, lat: 12.9176, lng: 77.6238, zone: 'South' },
  { id: 'KA003', name: 'Hebbal Flyover North, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 68, lat: 13.0358, lng: 77.5970, zone: 'South' },
  { id: 'KA004', name: 'Peenya Industrial Area Stage-1, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 138, lat: 13.0285, lng: 77.5195, zone: 'South' },
  { id: 'KA005', name: 'City Railway Station, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 115, lat: 12.9778, lng: 77.5684, zone: 'South' },
  { id: 'KA006', name: 'Saneguruvanahalli, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 72, lat: 12.9912, lng: 77.5458, zone: 'South' },
  { id: 'KA011', name: 'Jayanagar 5th Block, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 74, lat: 12.9250, lng: 77.5838, zone: 'South' },
  { id: 'KA012', name: 'Hombegowda Nagar NIMHANS, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 79, lat: 12.9431, lng: 77.5966, zone: 'South' },
  { id: 'KA013', name: 'Kadabeesanahalli ORR Bellandur, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 132, lat: 12.9352, lng: 77.6888, zone: 'South' },
  { id: 'KA014', name: 'Whitefield EPIP Industrial Zone, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 118, lat: 12.9784, lng: 77.7289, zone: 'South' },
  { id: 'KA015', name: 'Electronic City Phase-1 IT Hub, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 96, lat: 12.8452, lng: 77.6602, zone: 'South' },
  { id: 'KA016', name: 'Rajajinagar Industrial Estate, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 126, lat: 12.9915, lng: 77.5532, zone: 'South' },
  { id: 'KA017', name: 'Malleshwaram 18th Cross, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 76, lat: 13.0076, lng: 77.5713, zone: 'South' },
  { id: 'KA018', name: 'Shivajinagar MG Road Cantonment, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 108, lat: 12.9818, lng: 77.6033, zone: 'South' },
  { id: 'KA019', name: 'Kasturi Nagar Benniganahalli ORR, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 112, lat: 13.0075, lng: 77.6631, zone: 'South' },
  { id: 'KA020', name: 'Yelahanka New Town, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 65, lat: 13.1007, lng: 77.5963, zone: 'South' },
  { id: 'KA021', name: 'Kengeri Satellite Town, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 84, lat: 12.9177, lng: 77.4838, zone: 'South' },
  { id: 'KA022', name: 'Indiranagar 100ft Road Corridor, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 98, lat: 12.9719, lng: 77.6412, zone: 'South' },
  { id: 'KA023', name: 'Koramangala 80ft Road Junction, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 104, lat: 12.9352, lng: 77.6245, zone: 'South' },
  { id: 'KA024', name: 'Banashankari 3rd Stage, Bengaluru', city: 'Bengaluru', state: 'Karnataka', baseAqi: 75, lat: 12.9255, lng: 77.5467, zone: 'South' },
  { id: 'KA007', name: 'Jayachamarajendra College, Mysuru', city: 'Mysuru', state: 'Karnataka', baseAqi: 54, lat: 12.3129, lng: 76.6135, zone: 'South' },
  { id: 'KA008', name: 'Hubballi Deshpande Nagar, Hubballi', city: 'Hubballi', state: 'Karnataka', baseAqi: 92, lat: 15.3524, lng: 75.1384, zone: 'South' },
  { id: 'KA009', name: 'KPT Mangaluru Coastal, Mangaluru', city: 'Mangaluru', state: 'Karnataka', baseAqi: 62, lat: 12.8911, lng: 74.8560, zone: 'South' },
  { id: 'KA010', name: 'Navanagar Industrial, Bagalkot', city: 'Bagalkot', state: 'Karnataka', baseAqi: 86, lat: 16.1817, lng: 75.6958, zone: 'South' },

  // --- TAMIL NADU (Southern Coastal & Industrial) ---
  { id: 'TN001', name: 'Alandur Metro Station, Chennai', city: 'Chennai', state: 'Tamil Nadu', baseAqi: 92, lat: 13.0034, lng: 80.2033, zone: 'South' },
  { id: 'TN002', name: 'Velachery Residential Corridor, Chennai', city: 'Chennai', state: 'Tamil Nadu', baseAqi: 76, lat: 12.9759, lng: 80.2212, zone: 'South' },
  { id: 'TN003', name: 'Manali Petrochemical Zone, Chennai', city: 'Chennai', state: 'Tamil Nadu', baseAqi: 158, lat: 13.1678, lng: 80.2588, zone: 'South' },
  { id: 'TN004', name: 'Kodungaiyur Dump Yard Zone, Chennai', city: 'Chennai', state: 'Tamil Nadu', baseAqi: 142, lat: 13.1412, lng: 80.2644, zone: 'South' },
  { id: 'TN005', name: 'SIDCO Industrial Estate, Coimbatore', city: 'Coimbatore', state: 'Tamil Nadu', baseAqi: 84, lat: 10.9577, lng: 76.9678, zone: 'South' },
  { id: 'TN006', name: 'Madurai District Collectorate, Madurai', city: 'Madurai', state: 'Tamil Nadu', baseAqi: 78, lat: 9.9252, lng: 78.1198, zone: 'South' },
  { id: 'TN007', name: 'Bishop Heber College, Tiruchirappalli', city: 'Tiruchirappalli', state: 'Tamil Nadu', baseAqi: 69, lat: 10.8229, lng: 78.6872, zone: 'South' },
  { id: 'TN008', name: 'SIPCOT Industrial Park, Cuddalore', city: 'Cuddalore', state: 'Tamil Nadu', baseAqi: 112, lat: 11.7480, lng: 79.7714, zone: 'South' },

  // --- TELANGANA (Deccan Plateau Hub) ---
  { id: 'TG001', name: 'Sanathnagar Industrial Area, Hyderabad', city: 'Hyderabad', state: 'Telangana', baseAqi: 138, lat: 17.4563, lng: 78.4439, zone: 'South' },
  { id: 'TG002', name: 'Bollaram Industrial Zone, Hyderabad', city: 'Hyderabad', state: 'Telangana', baseAqi: 195, lat: 17.5510, lng: 78.3611, zone: 'South' },
  { id: 'TG003', name: 'Nehru Zoological Park, Hyderabad', city: 'Hyderabad', state: 'Telangana', baseAqi: 85, lat: 17.3508, lng: 78.4518, zone: 'South' },
  { id: 'TG004', name: 'ICRISAT Campus, Patancheru', city: 'Patancheru', state: 'Telangana', baseAqi: 122, lat: 17.5111, lng: 78.2750, zone: 'South' },
  { id: 'TG005', name: 'Central University Campus, Gachibowli', city: 'Hyderabad', state: 'Telangana', baseAqi: 94, lat: 17.4600, lng: 78.3300, zone: 'South' },
  { id: 'TG006', name: 'Warangal District Collectorate, Warangal', city: 'Warangal', state: 'Telangana', baseAqi: 88, lat: 17.9689, lng: 79.5941, zone: 'South' },

  // --- WEST BENGAL (Eastern Gangetic Delta) ---
  { id: 'WB001', name: 'Victoria Memorial Heritage Green, Kolkata', city: 'Kolkata', state: 'West Bengal', baseAqi: 178, lat: 22.5448, lng: 88.3426, zone: 'East' },
  { id: 'WB002', name: 'Jadavpur University Southern Hub, Kolkata', city: 'Kolkata', state: 'West Bengal', baseAqi: 194, lat: 22.4988, lng: 88.3716, zone: 'East' },
  { id: 'WB003', name: 'Rabindra Bharati University, Kolkata', city: 'Kolkata', state: 'West Bengal', baseAqi: 212, lat: 22.5855, lng: 88.3615, zone: 'East' },
  { id: 'WB004', name: 'Fort William Military Station, Kolkata', city: 'Kolkata', state: 'West Bengal', baseAqi: 156, lat: 22.5539, lng: 88.3364, zone: 'East' },
  { id: 'WB005', name: 'Bidhannagar Salt Lake City, Kolkata', city: 'Kolkata', state: 'West Bengal', baseAqi: 165, lat: 22.5867, lng: 88.4178, zone: 'East' },
  { id: 'WB006', name: 'Asansol Polytechnic Institute, Asansol', city: 'Asansol', state: 'West Bengal', baseAqi: 238, lat: 23.6889, lng: 86.9661, zone: 'East' },
  { id: 'WB007', name: 'City Centre Durgapur Steel, Durgapur', city: 'Durgapur', state: 'West Bengal', baseAqi: 225, lat: 23.5204, lng: 87.3119, zone: 'East' },
  { id: 'WB008', name: 'Siliguri North Bengal University, Siliguri', city: 'Siliguri', state: 'West Bengal', baseAqi: 146, lat: 26.7088, lng: 88.3533, zone: 'East' },
  { id: 'WB009', name: 'Haldia Petrochemical Complex, Haldia', city: 'Haldia', state: 'West Bengal', baseAqi: 192, lat: 22.0667, lng: 88.0698, zone: 'East' },

  // --- GUJARAT (Western Industrial Hub) ---
  { id: 'GJ001', name: 'Maninagar Traffic Intersection, Ahmedabad', city: 'Ahmedabad', state: 'Gujarat', baseAqi: 224, lat: 22.9978, lng: 72.6033, zone: 'West' },
  { id: 'GJ002', name: 'Chandkheda Residential, Ahmedabad', city: 'Ahmedabad', state: 'Gujarat', baseAqi: 165, lat: 23.1118, lng: 72.5855, zone: 'West' },
  { id: 'GJ003', name: 'Vatva GIDC Industrial Area, Ahmedabad', city: 'Ahmedabad', state: 'Gujarat', baseAqi: 258, lat: 22.9567, lng: 72.6378, zone: 'West' },
  { id: 'GJ004', name: 'Limbayat Regional, Surat', city: 'Surat', state: 'Gujarat', baseAqi: 174, lat: 21.1818, lng: 72.8569, zone: 'West' },
  { id: 'GJ005', name: 'Althan Community Centre, Surat', city: 'Surat', state: 'Gujarat', baseAqi: 135, lat: 21.1554, lng: 72.8021, zone: 'West' },
  { id: 'GJ006', name: 'Vapi GIDC Chemical Estate, Vapi', city: 'Vapi', state: 'Gujarat', baseAqi: 242, lat: 20.3700, lng: 72.9100, zone: 'West' },
  { id: 'GJ007', name: 'Dandiya Bazar, Vadodara', city: 'Vadodara', state: 'Gujarat', baseAqi: 168, lat: 22.3000, lng: 73.2000, zone: 'West' },
  { id: 'GJ008', name: 'Ankleshwar GIDC Industrial, Ankleshwar', city: 'Ankleshwar', state: 'Gujarat', baseAqi: 236, lat: 21.6264, lng: 73.0152, zone: 'West' },

  // --- BIHAR (Northern Plains High Density) ---
  { id: 'BR001', name: 'Muradpur Commercial, Patna', city: 'Patna', state: 'Bihar', baseAqi: 378, lat: 25.6207, lng: 85.1663, zone: 'East' },
  { id: 'BR002', name: 'Danapur Cantonment, Patna', city: 'Patna', state: 'Bihar', baseAqi: 345, lat: 25.6333, lng: 85.0500, zone: 'East' },
  { id: 'BR003', name: 'Samanpura Raja Bazar, Patna', city: 'Patna', state: 'Bihar', baseAqi: 362, lat: 25.6120, lng: 85.0920, zone: 'East' },
  { id: 'BR004', name: 'Muzaffarpur Collectorate, Muzaffarpur', city: 'Muzaffarpur', state: 'Bihar', baseAqi: 365, lat: 26.1209, lng: 85.3647, zone: 'East' },
  { id: 'BR005', name: 'Gaya Municipal Corporation, Gaya', city: 'Gaya', state: 'Bihar', baseAqi: 288, lat: 24.7914, lng: 85.0002, zone: 'East' },
  { id: 'BR006', name: 'Hajipur Industrial Area, Hajipur', city: 'Hajipur', state: 'Bihar', baseAqi: 350, lat: 25.6858, lng: 85.2074, zone: 'East' },
  { id: 'BR007', name: 'Begusarai Barauni Refinery, Begusarai', city: 'Begusarai', state: 'Bihar', baseAqi: 382, lat: 25.4182, lng: 86.1272, zone: 'East' },

  // --- RAJASTHAN (Arid & Industrial Belt) ---
  { id: 'RJ001', name: 'Adarsh Nagar Heritage, Jaipur', city: 'Jaipur', state: 'Rajasthan', baseAqi: 184, lat: 26.8998, lng: 75.8340, zone: 'North' },
  { id: 'RJ002', name: 'Shastri Nagar Residential, Jaipur', city: 'Jaipur', state: 'Rajasthan', baseAqi: 162, lat: 26.9388, lng: 75.7924, zone: 'North' },
  { id: 'RJ003', name: 'Sitapura Industrial Area, Jaipur', city: 'Jaipur', state: 'Rajasthan', baseAqi: 215, lat: 26.7725, lng: 75.8394, zone: 'North' },
  { id: 'RJ004', name: 'Bhiwadi Industrial Cluster, Alwar', city: 'Bhiwadi', state: 'Rajasthan', baseAqi: 388, lat: 28.2104, lng: 76.8606, zone: 'North' },
  { id: 'RJ005', name: 'Collectorate Compound, Jodhpur', city: 'Jodhpur', state: 'Rajasthan', baseAqi: 175, lat: 26.2389, lng: 73.0243, zone: 'North' },
  { id: 'RJ006', name: 'Shrinath Puram, Kota', city: 'Kota', state: 'Rajasthan', baseAqi: 168, lat: 25.1800, lng: 75.8300, zone: 'North' },
  { id: 'RJ007', name: 'Ashok Nagar, Udaipur', city: 'Udaipur', state: 'Rajasthan', baseAqi: 122, lat: 24.5854, lng: 73.7125, zone: 'North' },

  // --- PUNJAB (Agrarian & Manufacturing Plains) ---
  { id: 'PB001', name: 'Civil Line Police Lines, Ludhiana', city: 'Ludhiana', state: 'Punjab', baseAqi: 294, lat: 30.9010, lng: 75.8573, zone: 'North' },
  { id: 'PB002', name: 'Golden Temple Heritage Walk, Amritsar', city: 'Amritsar', state: 'Punjab', baseAqi: 220, lat: 31.6200, lng: 74.8765, zone: 'North' },
  { id: 'PB003', name: 'Urban Estate Phase II, Jalandhar', city: 'Jalandhar', state: 'Punjab', baseAqi: 264, lat: 31.3260, lng: 75.5762, zone: 'North' },
  { id: 'PB004', name: 'Punjabi University Campus, Patiala', city: 'Patiala', state: 'Punjab', baseAqi: 240, lat: 30.3398, lng: 76.3869, zone: 'North' },
  { id: 'PB005', name: 'Bathinda Thermal Colony, Bathinda', city: 'Bathinda', state: 'Punjab', baseAqi: 278, lat: 30.2110, lng: 74.9455, zone: 'North' },
  { id: 'PB006', name: 'Rupnagar Thermal Station, Mandi Gobindgarh', city: 'Mandi Gobindgarh', state: 'Punjab', baseAqi: 315, lat: 30.6667, lng: 76.3000, zone: 'North' },

  // --- MADHYA PRADESH (Central Plateau) ---
  { id: 'MP001', name: 'T.T. Nagar Sports Complex, Bhopal', city: 'Bhopal', state: 'Madhya Pradesh', baseAqi: 165, lat: 23.2332, lng: 77.4005, zone: 'Central' },
  { id: 'MP002', name: 'Pologround Industrial Estate, Indore', city: 'Indore', state: 'Madhya Pradesh', baseAqi: 188, lat: 22.7486, lng: 75.8519, zone: 'Central' },
  { id: 'MP003', name: 'Vijay Nagar Residential, Indore', city: 'Indore', state: 'Madhya Pradesh', baseAqi: 145, lat: 22.7533, lng: 75.8937, zone: 'Central' },
  { id: 'MP004', name: 'Maharaj Bada Historic Centre, Gwalior', city: 'Gwalior', state: 'Madhya Pradesh', baseAqi: 285, lat: 26.2183, lng: 78.1828, zone: 'Central' },
  { id: 'MP005', name: 'Madan Mahal, Jabalpur', city: 'Jabalpur', state: 'Madhya Pradesh', baseAqi: 152, lat: 23.1500, lng: 79.9100, zone: 'Central' },
  { id: 'MP006', name: 'Singrauli Thermal Power Belt, Singrauli', city: 'Singrauli', state: 'Madhya Pradesh', baseAqi: 340, lat: 24.1997, lng: 82.6644, zone: 'Central' },

  // --- KERALA (Southwestern Coastal Green) ---
  { id: 'KL001', name: 'Plammoodu, Thiruvananthapuram', city: 'Thiruvananthapuram', state: 'Kerala', baseAqi: 48, lat: 8.5144, lng: 76.9463, zone: 'South' },
  { id: 'KL002', name: 'MG Road Central, Kochi', city: 'Kochi', state: 'Kerala', baseAqi: 68, lat: 9.9674, lng: 76.2828, zone: 'South' },
  { id: 'KL003', name: 'Vytilla Mobility Hub, Kochi', city: 'Kochi', state: 'Kerala', baseAqi: 82, lat: 9.9686, lng: 76.3189, zone: 'South' },
  { id: 'KL004', name: 'Palayam Traffic Square, Kozhikode', city: 'Kozhikode', state: 'Kerala', baseAqi: 52, lat: 11.2588, lng: 75.7804, zone: 'South' },
  { id: 'KL005', name: 'Asramam Ground, Kollam', city: 'Kollam', state: 'Kerala', baseAqi: 45, lat: 8.8932, lng: 76.6141, zone: 'South' },

  // --- ANDHRA PRADESH (Southeastern Coastal) ---
  { id: 'AP001', name: 'GVM Corporation, Visakhapatnam', city: 'Visakhapatnam', state: 'Andhra Pradesh', baseAqi: 112, lat: 17.7292, lng: 83.3088, zone: 'South' },
  { id: 'AP002', name: 'INS Dega Naval Base, Visakhapatnam', city: 'Visakhapatnam', state: 'Andhra Pradesh', baseAqi: 88, lat: 17.7214, lng: 83.2245, zone: 'South' },
  { id: 'AP003', name: 'Benz Circle Traffic Corridor, Vijayawada', city: 'Vijayawada', state: 'Andhra Pradesh', baseAqi: 128, lat: 16.5062, lng: 80.6480, zone: 'South' },
  { id: 'AP004', name: 'Tirupati Railway Colony, Tirupati', city: 'Tirupati', state: 'Andhra Pradesh', baseAqi: 72, lat: 13.6288, lng: 79.4192, zone: 'South' },
  { id: 'AP005', name: 'Amaravati Capital City Complex, Amaravati', city: 'Amaravati', state: 'Andhra Pradesh', baseAqi: 65, lat: 16.5131, lng: 80.5165, zone: 'South' },

  // --- ODISHA (Eastern Mineral & Coastal) ---
  { id: 'OD001', name: 'Patia IT Corridor, Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', baseAqi: 138, lat: 20.3588, lng: 85.8167, zone: 'East' },
  { id: 'OD002', name: 'Badambadi Bus Terminal, Cuttack', city: 'Cuttack', state: 'Odisha', baseAqi: 155, lat: 20.4625, lng: 85.8828, zone: 'East' },
  { id: 'OD003', name: 'Talcher Coalfields Cluster, Angul', city: 'Angul', state: 'Odisha', baseAqi: 245, lat: 20.9500, lng: 85.2200, zone: 'East' },
  { id: 'OD004', name: 'Rourkela Steel Plant Colony, Rourkela', city: 'Rourkela', state: 'Odisha', baseAqi: 210, lat: 22.2259, lng: 84.8536, zone: 'East' },

  // --- JHARKHAND (Eastern Mining & Metal Hub) ---
  { id: 'JH001', name: 'Albert Ekka Chowk, Ranchi', city: 'Ranchi', state: 'Jharkhand', baseAqi: 168, lat: 23.3698, lng: 85.3253, zone: 'East' },
  { id: 'JH002', name: 'Bistupur Commercial, Jamshedpur', city: 'Jamshedpur', state: 'Jharkhand', baseAqi: 185, lat: 22.7925, lng: 86.1843, zone: 'East' },
  { id: 'JH003', name: 'Bank More Jharia Coal Belt, Dhanbad', city: 'Dhanbad', state: 'Jharkhand', baseAqi: 284, lat: 23.7957, lng: 86.4304, zone: 'East' },
  { id: 'JH004', name: 'Bokaro Steel City Sector 4, Bokaro', city: 'Bokaro', state: 'Jharkhand', baseAqi: 215, lat: 23.6693, lng: 86.1511, zone: 'East' },

  // --- CHHATTISGARH (Central Industrial Belt) ---
  { id: 'CG001', name: 'Devendra Nagar, Raipur', city: 'Raipur', state: 'Chhattisgarh', baseAqi: 178, lat: 21.2514, lng: 81.6296, zone: 'Central' },
  { id: 'CG002', name: 'Bhilai Steel Plant Township, Bhilai', city: 'Bhilai', state: 'Chhattisgarh', baseAqi: 218, lat: 21.2167, lng: 81.4333, zone: 'Central' },
  { id: 'CG003', name: 'Korba Power Industrial Belt, Korba', city: 'Korba', state: 'Chhattisgarh', baseAqi: 275, lat: 22.3595, lng: 82.7501, zone: 'Central' },

  // --- UTTARAKHAND (Himalayan Foothills) ---
  { id: 'UK001', name: 'Clock Tower Rajpur Road, Dehradun', city: 'Dehradun', state: 'Uttarakhand', baseAqi: 162, lat: 30.3244, lng: 78.0339, zone: 'North' },
  { id: 'UK002', name: 'Rishikesh AIIMS Campus, Rishikesh', city: 'Rishikesh', state: 'Uttarakhand', baseAqi: 95, lat: 30.0869, lng: 78.2676, zone: 'North' },
  { id: 'UK003', name: 'SIDCUL Industrial Area, Haridwar', city: 'Haridwar', state: 'Uttarakhand', baseAqi: 198, lat: 29.9457, lng: 78.1642, zone: 'North' },
  { id: 'UK004', name: 'Pantnagar Agricultural University, Udham Singh Nagar', city: 'Kashipur', state: 'Uttarakhand', baseAqi: 225, lat: 29.2167, lng: 78.9500, zone: 'North' },

  // --- HIMACHAL PRADESH (Himalayan High Altitude & Valleys) ---
  { id: 'HP001', name: 'The Ridge Mall Road, Shimla', city: 'Shimla', state: 'Himachal Pradesh', baseAqi: 42, lat: 31.1048, lng: 77.1734, zone: 'North' },
  { id: 'HP002', name: 'Baddi Industrial Area Phase 1, Baddi', city: 'Baddi', state: 'Himachal Pradesh', baseAqi: 235, lat: 30.9578, lng: 76.7914, zone: 'North' },
  { id: 'HP003', name: 'Dharamshala Cricket Stadium, Dharamshala', city: 'Dharamshala', state: 'Himachal Pradesh', baseAqi: 38, lat: 32.2190, lng: 76.3234, zone: 'North' },
  { id: 'HP004', name: 'Manali Mall Road Ecological, Manali', city: 'Manali', state: 'Himachal Pradesh', baseAqi: 32, lat: 32.2396, lng: 77.1887, zone: 'North' },

  // --- JAMMU & KASHMIR (Northern Himalayan Valley) ---
  { id: 'JK001', name: 'Bagh-e-Bahu Fort Garden, Jammu', city: 'Jammu', state: 'Jammu and Kashmir', baseAqi: 118, lat: 32.7266, lng: 74.8570, zone: 'North' },
  { id: 'JK002', name: 'Lal Chowk Central, Srinagar', city: 'Srinagar', state: 'Jammu and Kashmir', baseAqi: 92, lat: 34.0725, lng: 74.8115, zone: 'North' },
  { id: 'JK003', name: 'Hyderpora Bypass, Srinagar', city: 'Srinagar', state: 'Jammu and Kashmir', baseAqi: 110, lat: 34.0380, lng: 74.7950, zone: 'North' },

  // --- CHANDIGARH (Union Territory) ---
  { id: 'CH001', name: 'Sector 22 Market, Chandigarh', city: 'Chandigarh', state: 'Chandigarh', baseAqi: 165, lat: 30.7333, lng: 76.7794, zone: 'North' },
  { id: 'CH002', name: 'Sector 53 Institutional, Chandigarh', city: 'Chandigarh', state: 'Chandigarh', baseAqi: 148, lat: 30.7180, lng: 76.7320, zone: 'North' },

  // --- ASSAM & NORTHEAST (Brahmaputra Valley & Hills) ---
  { id: 'AS001', name: 'Pan Bazar Railway Crossing, Guwahati', city: 'Guwahati', state: 'Assam', baseAqi: 182, lat: 26.1856, lng: 91.7483, zone: 'Northeast' },
  { id: 'AS002', name: 'IIT Guwahati North Bank, Guwahati', city: 'Guwahati', state: 'Assam', baseAqi: 115, lat: 26.1923, lng: 91.6939, zone: 'Northeast' },
  { id: 'AS003', name: 'Lakhimi Nagar, Silchar', city: 'Silchar', state: 'Assam', baseAqi: 85, lat: 24.8333, lng: 92.7789, zone: 'Northeast' },
  { id: 'ML001', name: 'Polo Ground Stadium, Shillong', city: 'Shillong', state: 'Meghalaya', baseAqi: 44, lat: 25.5788, lng: 91.8933, zone: 'Northeast' },
  { id: 'TR001', name: 'Malancha Niwas, Agartala', city: 'Agartala', state: 'Tripura', baseAqi: 122, lat: 23.8315, lng: 91.2868, zone: 'Northeast' },
  { id: 'MN001', name: 'DM College Campus, Imphal', city: 'Imphal', state: 'Manipur', baseAqi: 62, lat: 24.8170, lng: 93.9368, zone: 'Northeast' },
  { id: 'NL001', name: 'Civil Secretariat, Kohima', city: 'Kohima', state: 'Nagaland', baseAqi: 48, lat: 25.6751, lng: 94.1086, zone: 'Northeast' },
  { id: 'MZ001', name: 'Khatla, Aizawl', city: 'Aizawl', state: 'Mizoram', baseAqi: 36, lat: 23.7271, lng: 92.7176, zone: 'Northeast' },
  { id: 'AR001', name: 'Ganga Lake Eco-Park, Itanagar', city: 'Itanagar', state: 'Arunachal Pradesh', baseAqi: 30, lat: 27.0844, lng: 93.6053, zone: 'Northeast' },
  { id: 'SK001', name: 'Zero Point Deorali, Gangtok', city: 'Gangtok', state: 'Sikkim', baseAqi: 34, lat: 27.3389, lng: 88.6065, zone: 'Northeast' },

  // --- GOA (Western Coastal Paradise) ---
  { id: 'GA001', name: 'Panaji Kadamba Bus Stand, Panaji', city: 'Panaji', state: 'Goa', baseAqi: 58, lat: 15.4909, lng: 73.8278, zone: 'West' },
  { id: 'GA002', name: 'Margao KTC Bus Stand, Margao', city: 'Margao', state: 'Goa', baseAqi: 65, lat: 15.2832, lng: 73.9862, zone: 'West' },

  // --- PUDUCHERRY (Union Territory) ---
  { id: 'PY001', name: 'Beach Road Promenade, Puducherry', city: 'Puducherry', state: 'Puducherry', baseAqi: 52, lat: 11.9338, lng: 79.8359, zone: 'South' },
];
