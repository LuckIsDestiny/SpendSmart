import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Pagination,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  AccountBalance as GovernmentIcon,
  Business as BusinessIcon,
  Savings as SavingsIcon,
  School as SchoolIcon,
  Home as HomeIcon
} from '@mui/icons-material';

// Mock data - In a real app, this would come from an API
const mockSchemes = [
  {
    id: 1,
    name: "Pradhan Mantri Jan Dhan Yojana",
    type: "Government",
    description: "A national mission for financial inclusion to ensure access to financial services.",
    eligibility: "All Indian citizens above 10 years of age",
    url: "https://pmjdy.gov.in",
    category: "savings"
  },
  {
    id: 2,
    name: "Sukanya Samriddhi Yojana",
    type: "Government",
    description: "A small deposit scheme for the girl child to ensure her education and marriage expenses.",
    eligibility: "Parents/legal guardians of girl child below 10 years",
    url: "https://www.indiapost.gov.in",
    category: "education"
  },
  {
    id: 3,
    name: "HDFC Home Loan",
    type: "Private",
    description: "Competitive home loan rates with flexible repayment options.",
    eligibility: "Salaried/self-employed individuals with stable income",
    url: "https://www.hdfc.com",
    category: "housing"
  },
  {
    id: 4,
    name: "LIC Jeevan Anand",
    type: "Private",
    description: "A participating non-linked plan offering both death and maturity benefits.",
    eligibility: "Individuals between 18-50 years",
    url: "https://licindia.in/lic-s-new-jeevan-anand-plan-no.-915-uin-no.-512n279v02-",
    category: "insurance"
  },
  {
    id: 5,
    name: "PM Awas Yojana",
    type: "Government",
    description: "Housing for all by 2022 - affordable housing scheme.",
    eligibility: "Economically weaker sections and low-income groups",
    url: "https://pmaymis.gov.in",
    category: "housing"
  },
  {
    id: 6,
    name: "Atal Pension Yojana",
    type: "Government",
    description: "A pension scheme focused on the unorganized sector workers.",
    eligibility: "Indian citizens between 18-40 years",
    url: "https://www.jansuraksha.gov.in",
    category: "savings"
  },
  {
    id: 7,
    name: "PM Kisan Samman Nidhi",
    type: "Government",
    description: "Income support scheme for farmers with direct benefit transfer.",
    eligibility: "Small and marginal farmer families",
    url: "https://pmkisan.gov.in",
    category: "savings"
  },
  {
    id: 8,
    name: "SBI Education Loan",
    type: "Private",
    description: "Comprehensive education loan for higher studies in India and abroad.",
    eligibility: "Students with admission to recognized institutions",
    url: "https://www.sbi.co.in",
    category: "education"
  },
  {
    id: 9,
    name: "PM Mudra Yojana",
    type: "Government",
    description: "Micro Units Development and Refinance Agency for small businesses.",
    eligibility: "Non-corporate, non-farm small/micro enterprises",
    url: "https://www.mudra.org.in",
    category: "savings"
  },
  {
    id: 10,
    name: "ICICI Pru Life Insurance",
    type: "Private",
    description: "Comprehensive life insurance plans with investment options.",
    eligibility: "Individuals between 18-65 years",
    url: "https://www.iciciprulife.com",
    category: "insurance"
  },
  {
    id: 11,
    name: "PM Kisan Maan Dhan Yojana",
    type: "Government",
    description: "Pension scheme for small and marginal farmers.",
    eligibility: "Small and marginal farmers between 18-40 years",
    url: "https://pmkmy.gov.in",
    category: "savings"
  },
  {
    id: 12,
    name: "Axis Bank Home Loan",
    type: "Private",
    description: "Competitive home loans with flexible repayment options.",
    eligibility: "Salaried/self-employed individuals with stable income",
    url: "https://www.axisbank.com",
    category: "housing"
  },
  {
    id: 13,
    name: "PM SVANidhi",
    type: "Government",
    description: "Micro credit facility for street vendors to resume their livelihoods.",
    eligibility: "Street vendors in urban areas",
    url: "https://pmsvanidhi.mohua.gov.in",
    category: "business"
  },
  {
    id: 14,
    name: "Kotak Mahindra Bank Business Loan",
    type: "Private",
    description: "Quick business loans for MSMEs with minimal documentation.",
    eligibility: "Business owners with 3+ years of experience",
    url: "https://www.kotak.com",
    category: "business"
  },
  {
    id: 15,
    name: "PM Ujjwala Yojana",
    type: "Government",
    description: "Free LPG connections to women from below poverty line families.",
    eligibility: "Women from BPL families",
    url: "https://www.pmujjwalayojana.com",
    category: "welfare"
  },
  {
    id: 16,
    name: "HDFC Bank Personal Loan",
    type: "Private",
    description: "Quick personal loans with competitive interest rates.",
    eligibility: "Salaried individuals with stable income",
    url: "https://www.hdfcbank.com",
    category: "personal"
  },
  {
    id: 17,
    name: "PM Garib Kalyan Yojana",
    type: "Government",
    description: "Financial assistance and food security for poor and vulnerable sections.",
    eligibility: "Below poverty line families",
    url: "https://www.nic.in",
    category: "welfare"
  },
  {
    id: 18,
    name: "ICICI Bank Car Loan",
    type: "Private",
    description: "Attractive car loans with flexible repayment options.",
    eligibility: "Salaried/self-employed individuals",
    url: "https://www.icicibank.com",
    category: "personal"
  },
  {
    id: 19,
    name: "PM Kisan Credit Card",
    type: "Government",
    description: "Credit card for farmers to meet their cultivation needs.",
    eligibility: "Farmers with land ownership",
    url: "https://www.pmkisan.gov.in",
    category: "agriculture"
  },
  {
    id: 20,
    name: "SBI Gold Loan",
    type: "Private",
    description: "Quick loans against gold with minimal documentation.",
    eligibility: "Individuals with gold ornaments",
    url: "https://www.sbi.co.in",
    category: "personal"
  },
  {
    id: 21,
    name: "PM Kisan Sampada Yojana",
    type: "Government",
    description: "Scheme for Agro-Marine Processing and Development of Agro-Processing Clusters.",
    eligibility: "Food processing entrepreneurs and organizations",
    url: "https://mofpi.nic.in",
    category: "agriculture"
  },
  {
    id: 22,
    name: "HDFC Mutual Fund",
    type: "Private",
    description: "Diverse range of mutual fund schemes for different investment goals.",
    eligibility: "All Indian residents",
    url: "https://www.hdfcfund.com",
    category: "investment"
  },
  {
    id: 23,
    name: "PM Matsya Sampada Yojana",
    type: "Government",
    description: "Scheme for development of fisheries sector and welfare of fishermen.",
    eligibility: "Fishermen and fish farmers",
    url: "https://dof.gov.in",
    category: "agriculture"
  },
  {
    id: 24,
    name: "ICICI Prudential Mutual Fund",
    type: "Private",
    description: "Comprehensive mutual fund solutions for long-term wealth creation.",
    eligibility: "All Indian residents",
    url: "https://www.icicipruamc.com",
    category: "investment"
  },
  {
    id: 25,
    name: "PM FME Scheme",
    type: "Government",
    description: "Formalization of Micro Food Processing Enterprises scheme.",
    eligibility: "Micro food processing enterprises",
    url: "https://mofpi.nic.in",
    category: "business"
  },
  {
    id: 26,
    name: "SBI Mutual Fund",
    type: "Private",
    description: "Wide range of mutual fund schemes for various investment objectives.",
    eligibility: "All Indian residents",
    url: "https://www.sbimf.com",
    category: "investment"
  },
  {
    id: 27,
    name: "PM Kisan Urja Suraksha",
    type: "Government",
    description: "Scheme for solar power generation and irrigation pumps.",
    eligibility: "Farmers with grid-connected agriculture pumps",
    url: "https://mnre.gov.in",
    category: "agriculture"
  },
  {
    id: 28,
    name: "Axis Mutual Fund",
    type: "Private",
    description: "Diverse investment options through various mutual fund schemes.",
    eligibility: "All Indian residents",
    url: "https://www.axismf.com",
    category: "investment"
  },
  {
    id: 29,
    name: "PM Kisan Samruddhi Kendras",
    type: "Government",
    description: "One-stop solution centers for farmers' needs and services.",
    eligibility: "All farmers",
    url: "https://www.pmkisan.gov.in",
    category: "agriculture"
  },
  {
    id: 30,
    name: "Kotak Mutual Fund",
    type: "Private",
    description: "Comprehensive mutual fund solutions for wealth creation.",
    eligibility: "All Indian residents",
    url: "https://www.kotakmutual.com",
    category: "investment"
  }
];

const categories = [
  { value: 'all', label: 'All Categories', icon: <FilterIcon /> },
  { value: 'savings', label: 'Savings', icon: <SavingsIcon /> },
  { value: 'education', label: 'Education', icon: <SchoolIcon /> },
  { value: 'housing', label: 'Housing', icon: <HomeIcon /> },
  { value: 'insurance', label: 'Insurance', icon: <BusinessIcon /> },
  { value: 'business', label: 'Business', icon: <BusinessIcon /> },
  { value: 'welfare', label: 'Welfare', icon: <BusinessIcon /> },
  { value: 'personal', label: 'Personal', icon: <BusinessIcon /> },
  { value: 'agriculture', label: 'Agriculture', icon: <BusinessIcon /> },
  { value: 'investment', label: 'Investment', icon: <BusinessIcon /> }
];

function FinancialSchemes() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [schemes, setSchemes] = useState(mockSchemes);
  const [page, setPage] = useState(1);
  const schemesPerPage = 9; // Show 9 schemes per page (3x3 grid)

  // Filter schemes based on search term and category
  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [schemes, searchTerm, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);
  const startIndex = (page - 1) * schemesPerPage;
  const paginatedSchemes = filteredSchemes.slice(startIndex, startIndex + schemesPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1); // Reset to first page on category change
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top of the page when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (category) => {
    const found = categories.find(c => c.value === category);
    return found ? found.icon : <FilterIcon />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Financial Schemes
      </Typography>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 4, p: 2, bgcolor: alpha(theme.palette.background.paper, 0.8) }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover': {
                    '& > fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
                startAdornment={getCategoryIcon(selectedCategory)}
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {category.icon}
                      {category.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Results Count */}
      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
        Showing {filteredSchemes.length} schemes
      </Typography>

      {/* Schemes Grid */}
      <Grid container spacing={3}>
        {paginatedSchemes.map((scheme) => (
          <Grid item xs={12} sm={6} md={4} key={scheme.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    {scheme.name}
                  </Typography>
                  <Chip
                    label={scheme.type}
                    color={scheme.type === 'Government' ? 'primary' : 'secondary'}
                    size="small"
                    icon={scheme.type === 'Government' ? <GovernmentIcon /> : <BusinessIcon />}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {scheme.description}
                </Typography>
                <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 600, mb: 1 }}>
                  Eligibility:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {scheme.eligibility}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  href={scheme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    py: 1,
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
              },
            }}
          />
        </Stack>
      )}
    </Box>
  );
}

export default FinancialSchemes; 
