import {
  Typography,
  Stack,
  Avatar,
  Divider,
  TextareaAutosize,
  Button,
} from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../Spinner';
import { postCommentData } from '../../../helpers/getDataFromServer';
import SendIcon from '@mui/icons-material/Send';
import PostComments from './PostComments';
import { useSingleDataContext } from '@/context/SingleData';
import { updateSingleData } from '../../../helpers/getDataFromServer';

const PostItems = () => {
  const { singleData } = useSingleDataContext();
  const [value, setValue] = useState();

  const center = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const commentValueHandler = (e) => {
    setValue(e.target.value);
  };

  const commentSubmitHandler = () => {
    postCommentData(singleData.owner.id, singleData.id, value);
    setValue('');
  };
  const updateSubmitHandler = async () => {
    try {
      const result = await updateSingleData('users', singleData.id, {
        likes: '1414',
      });
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={center}>
      <Typography variant='h3' fontWeight={800} mb={3}>
        {singleData.text}
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mt={5}
        mb={5}
        sx={{ width: 300 }}
      >
        <Avatar src={singleData.owner.picture} />
        <Stack direction='row'>
          <Typography color='text.grey' mr={2}>
            {singleData.owner.firstName}
          </Typography>
          <Typography color='text.grey'>
            {singleData.owner.lastName}{' '}
          </Typography>
        </Stack>
        <Divider orientation='vertical' flexItem />
        <Typography color='text.grey'>
          {new Date(singleData.publishDate.slice(0, 10)).toLocaleDateString(
            'en-US',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
          )}
        </Typography>
      </Stack>
      <Image
        src={singleData.image}
        alt={singleData.text}
        width={700}
        height={400}
        objectFit='cover'
      />
      <Typography fontSize={18} width={700} mt={5}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore quae
        nobis deserunt aspernatur! Laboriosam culpa architecto, hic libero quasi
        ex error neque labore veritatis commodi quaerat magni quo suscipit
        vitae, aspernatur nemo id ab reprehenderit repudiandae assumenda quas a
        quibusdam maiores consequuntur? Inventore voluptates cum in quidem
        molestias, necessitatibus sit, quas facere dolore maiores, minima quod
        ex rem? Sequi necessitatibus dolor voluptates harum possimus, nemo animi
        sunt laborum iusto nihil reprehenderit voluptatum sapiente ad eligendi
        aspernatur est culpa molestias blanditiis quia pariatur. Commodi, eius
        ut, quas eveniet animi voluptate quidem velit asperiores vero voluptas
        consequuntur, quos unde natus voluptatum aliquam?
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='flex-start'
        mt={5}
        mb={5}
        sx={{ width: 300 }}
      >
        <Avatar src={singleData.owner.picture} />
        <Stack ml={5}>
          <Typography color='text.darkBlue'>Written by</Typography>
          <Stack direction='row'>
            <Typography color='text.grey' mr={2}>
              {singleData.owner.firstName}
            </Typography>
            <Typography color='text.grey'>
              {singleData.owner.lastName}{' '}
            </Typography>
          </Stack>
          <Typography color='text.grey' fontSize={14}>
            CEO Team App{' '}
          </Typography>
        </Stack>
      </Stack>
      {/* <PostComments postId={singleData.id} /> */}
      <Divider />
      <Typography fontSize={24} color='text.grey'>
        Leave your comment below
      </Typography>
      <TextareaAutosize
        aria-label='empty textarea'
        placeholder='Empty'
        minRows={3}
        style={{ width: 400, height: 100, borderRadius: '4px' }}
        value={value}
        onChange={commentValueHandler}
      />
      <Button
        variant='contained'
        onClick={commentSubmitHandler}
        endIcon={<SendIcon />}
        sx={{ margin: 5 }}
      >
        Submit your comment
      </Button>
      <Button
        variant='contained'
        onClick={updateSubmitHandler}
        endIcon={<SendIcon />}
        sx={{ margin: 5 }}
      >
        Update your LIKES
      </Button>
    </div>
  );
};

export default PostItems;
