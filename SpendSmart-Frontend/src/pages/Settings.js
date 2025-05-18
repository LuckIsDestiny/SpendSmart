import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Person as PersonIcon,
  Palette as PaletteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { fetchProfile, updateProfile } from '../api/api';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

// Predefined avatars
const AVATAR_OPTIONS = [
  { id: 1, color: '#4a90e2' }, // Blue
  { id: 2, color: '#50c878' }, // Emerald
  { id: 3, color: '#f5a623' }, // Orange
  { id: 4, color: '#d0021b' }, // Red
  { id: 5, color: '#9013fe' }, // Purple
  { id: 6, color: '#417505' }, // Green
  { id: 7, color: '#f8e71c' }, // Yellow
  { id: 8, color: '#7ed321' }, // Lime
];

const Settings = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const { updateUser } = useAuth();
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarId: 1,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchProfile();
        const user = response.data.user;
        if (user) {
          const names = user.name ? user.name.split(' ') : ['', ''];
          setProfile({
            firstName: names[0] || '',
            lastName: names.slice(1).join(' ') || '',
            email: user.email || '',
            avatarId: user.avatarId || 1,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarSelect = (avatarId) => {
    setProfile(prev => ({
      ...prev,
      avatarId
    }));
    setAvatarDialogOpen(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveError('');
    setSuccessMessage('');
    try {
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();
      const response = await updateProfile({ 
        name: fullName, 
        email: profile.email,
        avatarId: profile.avatarId 
      });
      
      updateUser({
        name: fullName,
        email: profile.email,
        avatarId: profile.avatarId
      });
      
      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={500}>
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Settings
        </Typography>
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                <Card elevation={0} sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Profile Settings
                      </Typography>
                      <EditIcon sx={{ ml: 1, color: 'text.secondary' }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <Box 
                        sx={{ 
                          position: 'relative', 
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }} 
                        onClick={() => setAvatarDialogOpen(true)}
                      >
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            mr: 2,
                            backgroundColor: AVATAR_OPTIONS.find(a => a.id === profile.avatarId)?.color || 'primary.main',
                            border: '3px solid',
                            borderColor: 'background.paper',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                          }}
                        >
                          {profile.firstName ? profile.firstName[0].toUpperCase() : 'U'}
                        </Avatar>
                        <IconButton
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'background.paper',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            '&:hover': { 
                              backgroundColor: 'background.paper',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                          size="small"
                        >
                          <PersonIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box sx={{ ml: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Profile Picture
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }} onClick={() => setAvatarDialogOpen(true)}>
                          Change Avatar
                        </Typography>
                      </Box>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          value={profile.firstName}
                          variant="outlined"
                          onChange={(e) => handleProfileChange('firstName', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={profile.lastName}
                          variant="outlined"
                          onChange={(e) => handleProfileChange('lastName', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          value={profile.email}
                          variant="outlined"
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                },
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSaveProfile}
                          disabled={saving}
                          startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                          sx={{
                            mt: 2,
                            py: 1,
                            px: 3,
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            },
                          }}
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        {saveError && (
                          <Alert severity="error" sx={{ mt: 2 }}>
                            {saveError}
                          </Alert>
                        )}
                        {successMessage && (
                          <Alert severity="success" sx={{ mt: 2 }}>
                            {successMessage}
                          </Alert>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <Card elevation={0} sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Appearance
                      </Typography>
                      <PaletteIcon sx={{ ml: 1, color: 'text.secondary' }} />
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={mode === 'dark'}
                          onChange={toggleTheme}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body1">
                          Dark Mode
                        </Typography>
                      }
                    />
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          </Grid>
        )}

        {/* Avatar Selection Dialog */}
        <Dialog 
          open={avatarDialogOpen} 
          onClose={() => setAvatarDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: 400,
            }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            Choose an Avatar
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {AVATAR_OPTIONS.map((avatar) => (
                <Grid item key={avatar.id}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      backgroundColor: avatar.color,
                      cursor: 'pointer',
                      border: profile.avatarId === avatar.id ? '3px solid' : 'none',
                      borderColor: 'primary.main',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                      },
                    }}
                    onClick={() => handleAvatarSelect(avatar.id)}
                  >
                    {profile.firstName ? profile.firstName[0].toUpperCase() : 'U'}
                  </Avatar>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={() => setAvatarDialogOpen(false)}
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default Settings;
